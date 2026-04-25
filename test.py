import httpx
import asyncio

async def test():
    client = httpx.AsyncClient()
    payload = {
        "jsonrpc": "2.0",
        "method": "eth_call",
        "params": [{"to": "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2", "data": "0xbf92857c00000000000000000000000028c6c06298d514db089934071355e5743bf21d60"}, "latest"],
        "id": 1
    }
    response = await client.post('https://eth.llamarpc.com', json=payload)
    print(response.status_code)
    print(response.json())

asyncio.run(test())
