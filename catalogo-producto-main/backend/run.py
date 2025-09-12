from app import create_app

app = create_app()

if __name__ == '__main__':
    # Usar el puerto desde argumentos o variable de entorno
    import os
    port = int(os.environ.get('PORT', 5001))  # ← Puerto 5001 por defecto
    app.run(debug=True, host='0.0.0.0', port=port)