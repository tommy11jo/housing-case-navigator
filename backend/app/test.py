import asyncio

from process.process import extract_data_helper


async def main():
    # fname = "Decision Franklin v WPC 20230001 and 20230002"
    # fname = "Decision Nee v WPC 20230003 and 20230004"
    # fname = "Wentworth_1084 2024.05.06 HODecision_Redacted"
    # filepath = f"../data/mtnview_petition_decisions/{fname}.pdf"
    fname = "Decision Wilkerson v WPC 20240001"
    filepath = f"../data/epa_petition_decisions/{fname}.pdf"
    files = [
        "Central_511 2024.01.11 HODecision_Redacted",
        "Del Medio_141 2022.11.08 HODecision_Redacted",
        "Escuela_222 2023.10.16 HODecision_Redacted",
        "Higdon_1826 2024.01.29 HOCPDecision_Redacted",
        "Rengstorff_429 2023.02.17 HODecision_Redacted",
        "Rich_939 2024.04.03 AppealDecision_Redacted",
        "Wright_1725 2024.04.03 RemandAppealDecision_Redacted",
    ]

    for fname in files:
        filepath = f"../data/mtnview_petition_decisions/{fname}.pdf"
        file = open(filepath, "rb")
        print(f"\nProcessing: {fname}")
        output = await extract_data_helper(file, fname, save=True)
        print(output)
        file.close()


if __name__ == "__main__":
    asyncio.run(main())
