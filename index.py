from app import app, pagna_error

if __name__ == '__main__':
    app.register_error_handler(404, pagna_error)
    app.run(debug=True)
    
# esto es para ejecutra el sistema
# .\env\Scripts\activate
# python index.py
