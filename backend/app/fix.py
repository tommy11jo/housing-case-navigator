import os


def find_missing_processed_files():
    # Source directories
    epa_dir = "../data/epa_petition_decisions"
    mtnview_dir = "../data/mtnview_petition_decisions"
    processed_dir = "../data/all_decisions_processed"

    # Get all original filenames without extensions
    original_files = set()
    for filename in os.listdir(epa_dir):
        original_files.add(filename.rsplit(".", 1)[0])
    for filename in os.listdir(mtnview_dir):
        original_files.add(filename.rsplit(".", 1)[0])

    # Get all processed filenames without extensions
    processed_files = set()
    for filename in os.listdir(processed_dir):
        processed_files.add(filename.rsplit(".", 1)[0])

    # Find missing files
    missing_files = original_files - processed_files

    print(f"Total original files: {len(original_files)}")
    print(f"Total processed files: {len(processed_files)}")
    print(f"Missing files ({len(missing_files)}):")
    for filename in sorted(missing_files):
        print(f"- {filename}")


if __name__ == "__main__":
    find_missing_processed_files()
