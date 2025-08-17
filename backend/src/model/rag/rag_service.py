import os
import re
from dotenv import load_dotenv
from huggingface_hub import InferenceClient
from langchain_qdrant import QdrantVectorStore
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.prompts import PromptTemplate
from langchain_core.runnables import Runnable
from qdrant_client import QdrantClient
import socketio

load_dotenv()

# Configuration
MODEL_NAME = os.getenv("CHAT_MODEL")
QDRANT_URL = os.getenv("QDRANT_URL")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL")
hf_token = os.getenv("HF_TOKEN")
GREETINGS = [
    "hi",
    "hello",
    "hey",
    "greetings",
    "good morning",
    "good afternoon",
    "good evening",
]
SERVER_URL = "http://localhost:5000"

# Initialize Hugging Face InferenceClient
if not hf_token:
    raise ValueError(
        "Please set the HF_TOKEN environment variable to your Hugging Face API token."
    )

# Initialize client with the chat model
client = InferenceClient(model=MODEL_NAME, token=hf_token)

# Initialize embeddings
embeddings = HuggingFaceEmbeddings(
    model_name=EMBEDDING_MODEL, model_kwargs={"device": "cpu"}
)

# Create Qdrant client
qdrant_client = QdrantClient(url=QDRANT_URL, prefer_grpc=False)

# Connect to existing vector store
vector_store = QdrantVectorStore(
    client=qdrant_client, collection_name=COLLECTION_NAME, embedding=embeddings
)

# Runnable class for chat completion
class HuggingFaceRunnable(Runnable):
    def __init__(self, client: InferenceClient):
        self.client = client

    def invoke(self, input: str, config=None) -> str:
        if not input:
            raise ValueError("No prompt text provided")

        # Generate response
        response = self.client.chat_completion(
            messages=[{"role": "user", "content": input}], max_tokens=500, stream=False
        )

        # Extract the generated response
        return response.choices[0].message.content

# Initialize the custom Runnable
hf_runnable = HuggingFaceRunnable(client=client)

def is_greeting(message: str) -> bool:
    """Check if the message is a greeting"""
    normalized = message.lower().strip()
    return any(greeting in normalized for greeting in GREETINGS)

# Function to generate answer from a question
def generate_answer(question: str) -> str:
    try:
        if is_greeting(question):
            greeting_prompt = f"""
            <|system|>
            You are a friendly assistant. Respond to the greeting in a warm, welcoming manner.
            Keep your response brief (1 sentence).
            </s>
            <|user|>
            {question}</s>
            <|assistant|>
            """
            answer = hf_runnable.invoke(greeting_prompt)
            return f"AI: {answer}"

        # Retrieve relevant document chunks
        docs = vector_store.similarity_search(query=question, k=5)
        context = "\n\n".join([doc.page_content for doc in docs])

        # First attempt: Try to answer from document context
        document_prompt = f"""
        <|system|>
        You are an expert assistant. Answer the question based ONLY on the following document context.
        Do not use any external knowledge. If the answer isn't in the context, say "I cannot answer based on the document."

        Context:
        {context}
        </s>
        <|user|>
        {question}</s>
        <|assistant|>
        """
        document_answer = hf_runnable.invoke(document_prompt)

        # Check if document provided an answer
        if "cannot answer based on the document" in document_answer.lower():
            # Fall back to general knowledge
            general_prompt = f"""
            <|system|>
            You are an expert assistant. Answer the question using your general knowledge.
            </s>
            <|user|>
            {question}</s>
            <|assistant|>
            """
            answer = hf_runnable.invoke(general_prompt)
        else:
            answer = document_answer

        return f"{answer}"

    except Exception as e:
        return f"Error: {str(e)}"

def generate_answer_without_rag(question: str):
    """Generate an answer without using RAG (retrieval-augmented generation)"""
    try:
        # Use the Hugging Face model directly for general knowledge
        general_prompt = f"""
        <|system|>
        You are an expert assistant. Answer the question using your general knowledge.
        </s>
        <|user|>
        {question}</s>
        <|assistant|>
        """
        answer = hf_runnable.invoke(general_prompt)
        return f"{answer}"

    except Exception as e:
        return f"Error: {str(e)}"

