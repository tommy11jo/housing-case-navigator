import asyncio

from process.process import extract_data_helper


async def main():
    # fname = "Decision Franklin v WPC 20230001 and 20230002"
    fname = "Decision Nee v WPC 20230003 and 20230004"
    filepath = f"../epa_petition_decisions/{fname}.pdf"
    file = open(filepath, "rb")
    output = await extract_data_helper(file, fname, save=True)
    print(output)
    # output = await extract_all_mtnview_data()
    # output = await extract_all_epa_data()
    # print(output)


if __name__ == "__main__":
    asyncio.run(main())
