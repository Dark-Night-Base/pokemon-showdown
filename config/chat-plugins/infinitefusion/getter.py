import os
import time
import psutil
import subprocess
while True:
    time.sleep(1)
    vscode = False
    for process in psutil.process_iter():
        cwd = ''
        try:
            cwd = process.cwd()
        except Exception:
            pass
        finally:
            if cwd.find('vscode') != -1:
                vscode = True
                break
    if vscode:
        continue
    files = os.listdir('.')
    if 'done' in files:
        with open('task') as t:
            lines = t.read().split(',')
            for line in lines:
                args = line.split(' ')
                subprocess.run(['python3', 'getRemoteIFSprite.py', args[0], args[1]], cwd='/home/mc/pokemon-showdown-client/sprites')
        os.remove(os.path.join('.', 'task'))
        os.remove(os.path.join('.', 'done'))