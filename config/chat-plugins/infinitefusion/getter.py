import os
import time
import subprocess
while True:
    time.sleep(1)
    files = os.listdir('.')
    if 'done' in files:
        with open('task') as t:
            lines = t.read().split(',')
            for line in lines:
                args = line.split(' ')
                subprocess.run(['python3', 'getRemoteIFSprite.py', args[0], args[1]], cwd='/home/mc/pokemon-showdown-client/sprites')
        os.remove(os.path.join('.', 'task'))
        os.remove(os.path.join('.', 'done'))