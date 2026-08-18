import argparse
import os

from datasets import load_dataset
from trl import SFTConfig, SFTTrainer


def parse_args():
    parser = argparse.ArgumentParser()

    # hyperparameters sent by the ModelTrainer arrive as command-line arguments
    parser.add_argument("--model_name", type=str, default="Qwen/Qwen3-0.6B")
    parser.add_argument("--dataset_name", type=str, default="trl-lib/Capybara")
    parser.add_argument("--max_steps", type=int, default=50)
    parser.add_argument("--train_batch_size", type=int, default=4)
    parser.add_argument("--learning_rate", type=float, default=2e-5)

    # SageMaker directories: SM_MODEL_DIR is archived to S3 as model.tar.gz at the end of the job
    parser.add_argument("--model_dir", type=str, default=os.environ["SM_MODEL_DIR"])
    parser.add_argument("--output_dir", type=str, default=os.environ.get("SM_OUTPUT_DATA_DIR", "/opt/ml/output"))

    return parser.parse_args()


def main():
    args = parse_args()

    # the dataset downloads from the Hugging Face Hub inside the training container
    dataset = load_dataset(args.dataset_name, split="train")

    training_args = SFTConfig(
        output_dir=args.output_dir,
        max_steps=args.max_steps,
        per_device_train_batch_size=args.train_batch_size,
        learning_rate=args.learning_rate,
        logging_steps=5,
        save_strategy="no",  # the final model is saved explicitly below
        report_to=[],
    )

    trainer = SFTTrainer(
        model=args.model_name,
        args=training_args,
        train_dataset=dataset,
    )
    trainer.train()

    # save the model and tokenizer where SageMaker expects them
    trainer.save_model(args.model_dir)
    trainer.processing_class.save_pretrained(args.model_dir)


if __name__ == "__main__":
    main()
