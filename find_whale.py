import urllib.request, json
url = "https://ethereum-rpc.publicnode.com"
def check_address(addr):
    addr_pad = addr.replace("0x", "").zfill(64)
    data = "0xbf92857c" + addr_pad
    payload = {"jsonrpc": "2.0", "method": "eth_call", "params": [{"to": "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2", "data": data}, "latest"], "id": 1}
    req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers={'Content-Type': 'application/json'})
    res = json.loads(urllib.request.urlopen(req).read().decode('utf-8'))
    result = res.get("result", "")
    if result and len(result) >= 130:
        hex_data = result[2:]
        t_c = int(hex_data[0:64], 16) / 1e8
        t_d = int(hex_data[64:128], 16) / 1e8
        if t_c > 1000 and t_d > 100:
            print(f"FOUND: {addr} | Collateral: {t_c} USD | Debt: {t_d} USD")
            return True
    return False

# Some known defi whales from etherscan top labels
addresses = [
    "0x7a16ff8270133f063aab6c9977183d9e72835428", # Binance
    "0x5a52e96bacdabb82fd05763e25335261b270efcb", # Justin Sun
    "0x1111111254fb6c44bac0bed2854e76f90643097d", # 1inch
    "0xbdfa4f4492dd7b7cf211209c4791af8d52bf5c50", 
    "0x00000000219ab540356cBB839Cbe05303d7705Fa", # ETH 2 Dep
    "0xF977814e90dA44bFA03b6295A0616a897441aceC", 
    "0x8b4334d4812C530574Bd4F2763FcD22dE94A969B",
    "0xCFFA1c619420D0dc2b6F2269C0C30E3082aB0E09"
]
for a in addresses:
    if check_address(a): break
