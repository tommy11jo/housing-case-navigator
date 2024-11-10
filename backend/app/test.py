import asyncio

from process.process import extract_data_helper


async def main():
    # fname = "Decision Franklin v WPC 20230001 and 20230002"
    fname = "Decision Nee v WPC 20230003 and 20230004"
    filepath = f"../epa_petition_decisions/{fname}.pdf"
    file = open(filepath, "rb")
    # output = await extract_data_helper(file, fname, save=True)
    # print(output)
    # output = await extract_all_mtnview_data()
    # output = await extract_all_epa_data()
    # print(output)
    fnames = [
        "Continental_707 2023.05.19 HODecision_Redacted",
        "Montecito_1375 2022.12.14 HODecision_Redacted",
        "Park_880 2023.04.12 HODecision_Redacted (2)",
    ]
    for fname in fnames:
        filepath = f"../mtnview_petition_decisions/{fname}.pdf"
        file = open(filepath, "rb")
        output = await extract_data_helper(file, fname, save=True)
        print(output)


if __name__ == "__main__":
    asyncio.run(main())
