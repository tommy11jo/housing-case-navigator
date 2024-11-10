import asyncio

from process.process import extract_data_helper


async def main():
    file = open("../data/California_1556 2023.11.21 HODecision_Redacted.pdf", "rb")
    output = await extract_data_helper(file)
    print(output)


if __name__ == "__main__":
    asyncio.run(main())
