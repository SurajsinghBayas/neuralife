import cv2
import easyocr
import pandas as pd
import sys
import os

def preprocess_image(image_path):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    thresh = cv2.adaptiveThreshold(blurred, 255,
                                   cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                   cv2.THRESH_BINARY_INV, 11, 2)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2))
    processed_image = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
    return processed_image

def extract_text_from_image(image_path):
    reader = easyocr.Reader(['en'])
    result = reader.readtext(image_path, detail=0)
    return " ".join(result)

def save_to_csv(diagnoses, output_file_path):
    df = pd.DataFrame(diagnoses, columns=["Diagnoses"])
    df.to_csv(output_file_path, index=False)
    print(f"Data successfully written to {output_file_path}")

def main(input_image_path):
    # Get current script directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Create output file path
    output_file_path = os.path.join(script_dir, "diagnosis.csv")

    # Process and extract
    preprocess_image(input_image_path)  # Optional if not saving image
    extracted_text = extract_text_from_image(input_image_path)
    diagnoses = [extracted_text]
    
    # Save results
    save_to_csv(diagnoses, output_file_path)

if __name__ == "__main__":
    input_image = r"input.png"  # Replace with your actual image file
    main(input_image)
