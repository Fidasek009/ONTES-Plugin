import json

with open("ONTES-Single-Answers.json", 'r') as f:
    dataS = json.load(f)

with open("ONTES-Multi-Answers.json", 'r') as f:
    dataM = json.load(f)

with open("IKT_3-Answers.html", "r", encoding='utf-8') as f:
    otazka = ""
    odpoved = ""
    multi = []
    for line in f:
        if "typ=\"multi\"" in line:
            multiQ = line[line.index("id=")+4:line.index("id=")+15].strip('"')
            multi.append(multiQ)
            dataM[multiQ] = []
        elif "class=\"odpoved odpoved-spravne\"" in line:
            odpoved = line[line.index("id=")+4:line.index("id=")+9].strip('"')
            otazka = "otazka" + line[line.index("otazka=")+8:line.index("otazka=")+13].strip('"')
            if otazka in multi:
                dataM[otazka].append(odpoved)
                if otazka in dataS:
                    del dataS[otazka]
                    print("deleted: "+otazka)
            else:
                dataS[otazka] = odpoved

print("done")


with open("ONTES-Single-Answers.json", 'w', encoding='utf-8') as f:
    f.write(json.dumps(dataS, indent=4, ensure_ascii=False, sort_keys=True))

with open("ONTES-Multi-Answers.json", 'w', encoding='utf-8') as f:
    f.write(json.dumps(dataM, indent=4, ensure_ascii=False, sort_keys=True))
