import sys
from transformers import pipeline

def detect_emotion(text):
    classifier = pipeline(task="text-classification", model="SamLowe/roberta-base-go_emotions")
    model_output = classifier(text)
    top_two_emotions = model_output[:2]
    output_str = ", ".join([f"{emotion['label']}: {emotion['score'] * 100:.2f}%" for emotion in model_output])


    return output_str

if __name__ == "__main__":
    if len(sys.argv) > 1:
        input_text = sys.argv
        print(detect_emotion(input_text))

