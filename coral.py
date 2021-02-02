from flask import Flask, send_from_directory, request
import os
app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('top', 'index.html')

@app.route('/<path:path>')
def root(path):
    if (path == '' or path == None):
        return send_from_directory('top', 'index.html')
    else:
        return send_from_directory('top', path) 

@app.errorhandler(404)
def page_not_found(e):
    path = request.url.split('/')[3].split('?')[0]
    if (os.path.exists("top/" + path + ".html") == True):
        return send_from_directory('top', path + '.html')
    else:
        return send_from_directory('top', '404.html'), 404

@app.after_request
def requaf(re):
    return re



if __name__ == '__main__':
      app.run(host='0.0.0.0', port=80)