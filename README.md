# web-audio-analysis
Open a command prompt and run <code>python -m http.server 80</code>.
Then open another window, start a Python shell, and run:<br>
<code> >>> from pyngrok import ngrok</code><br>
<code> >>> https_tunnel = ngrok.connect(bind_tls=True)</code><br>
<code> >>> https_tunnel</code>
