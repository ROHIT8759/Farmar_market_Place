from huggingface_hub import InferenceClient
from langchain_core.runnables import Runnable

MODEL_NAME = "openai/gpt-oss-20b"   # replace with a text-generation model
hf_token = "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"

client = InferenceClient(model=MODEL_NAME, token=hf_token)

class HuggingFaceRunnable(Runnable):
    def __init__(self, client: InferenceClient):
        self.client = client

    def invoke(self, input: str, config=None) -> str:
        if not input:
            raise ValueError("No prompt text provided")

    # Generate response (chat mode)
        response = self.client.chat_completion(
            messages=[{"role": "user", "content": input}],
            max_tokens=500,
            stream=False
        )
    
        # Extract text from response object
        if hasattr(response, "choices"):  # In case it's a dataclass-like object
            content = response.choices[0].message["content"]
        elif isinstance(response, dict):
            content = response["choices"][0]["message"]["content"]
        else:
            raise ValueError(f"Unexpected response format: {response}")
    
        return content.strip()
    

hf_runnable = HuggingFaceRunnable(client=client)


def generate_answer_without_rag(question: str):
    """Generate an answer without using RAG"""
    try:
        general_prompt = f"You are an expert assistant. Answer this:\n\n{question}\n\nAnswer:"
        answer = hf_runnable.invoke(general_prompt)
        return answer

    except Exception as e:
        return f"Error: {str(e)}"
