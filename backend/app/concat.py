import json
import os
from typing import List, Dict


def concatenate_decisions(
    directory: str = "../data/all_decisions_processed",
) -> List[Dict]:
    """
    Read all JSON files in the specified directory and concatenate their petitions into a single list
    """
    all_petitions = []

    for filename in os.listdir(directory):
        if not filename.endswith(".json"):
            continue

        file_path = os.path.join(directory, filename)
        with open(file_path, "r") as f:
            try:
                data = json.load(f)
                if "petitions" in data:
                    for petition in data["petitions"]:
                        petition["source_file"] = filename
                    all_petitions.extend(data["petitions"])
            except json.JSONDecodeError as e:
                print(f"Error reading {filename}: {e}")

    return {"petitions": all_petitions}


def save_concatenated_decisions(output_file: str = "../data/all_decisions.json"):
    """
    Concatenate all decisions and save to a single JSON file
    """
    all_data = concatenate_decisions()
    with open(output_file, "w") as f:
        json.dump(all_data, f, indent=2)
    return all_data


if __name__ == "__main__":
    result = save_concatenated_decisions()
    print(
        f"Successfully concatenated {len(result['petitions'])} petitions into all_decisions.json"
    )
