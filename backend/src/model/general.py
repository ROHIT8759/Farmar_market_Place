from huggingface_hub import InferenceClient
from langchain_core.runnables import Runnable

MODEL_NAME = "openai/gpt-oss-20b"   # replace with a text-generation model
hf_token = "hf_your_token_here"

client = InferenceClient(model=MODEL_NAME, token=hf_token)

class HuggingFaceRunnable(Runnable):
    def __init__(self, client: InferenceClient):
        self.client = client

    def invoke(self, input: str, config=None) -> str:
        if not input:
            raise ValueError("No prompt text provided")

        # Generate response (plain text)
        response = self.client.text_generation(
            input,
            max_new_tokens=500,
            do_sample=True,
            temperature=0.7,
        )

        return response.strip()
    

hf_runnable = HuggingFaceRunnable(client=client)


def generate_answer_without_rag(question: str):
    """Generate an answer without using RAG"""
    try:
        general_prompt = f"You are an expert assistant. Answer this:\n\n{question}\n\nAnswer:"
        answer = hf_runnable.invoke(general_prompt)
        return answer

    except Exception as e:
        return f"Error: {str(e)}"
