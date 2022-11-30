import os

commands = [
    "python ./data/process_raw_data.py 100k-0-999.json 0 1000 100000",
    "python ./data/process_raw_data.py 100k-1000-1999.json 1000 1999 100000",
    "python ./data/process_raw_data.py 100k-2000plus.json 2000 3500 100000",
    "python ./data/process_raw_data.py 1m-nofilter.json 0 3500 1000000"
]

for command in commands:
    os.system(command)