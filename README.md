# web-audio-analysis
Open a command prompt, navigate to the repository folder, and run <code>python -m http.server 80</code>.
Then open another window, start a Python shell, and run:<br>
<code> >>> from pyngrok import ngrok</code><br>
<code> >>> https_tunnel = ngrok.connect(bind_tls=True)</code><br>
<code> >>> https_tunnel</code>

Using Chrome or Firefox, navigate to the first web address printed.

(Note that the <code>pyngrok</code> package is required for setting up the server - use <code>pip install pyngrok</code> if it is not installed.)
