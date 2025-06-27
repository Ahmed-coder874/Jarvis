from AppOpener import close, open as appopen
from webbrowser import open as webopen
from pywhatkit import search, playonyt
from dotenv import dotenv_values
from bs4 import BeautifulSoup
from rich import print
from groq import Groq
import webbrowser
import subprocess
import requests
import keyboard
import asyncio
import os

# Load environment variables
env_vars = dotenv_values(".env")
GroqAPIKey = env_vars.get("GroqAPIKey")

useragent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36'

client = Groq(api_key=GroqAPIKey)

SystemChatBot = [{"role": "system", "content": f"Hello, I am {os.environ['Username']}, You're a content writer. You have to write content like letter"}]
message = []

# 💡 Fallback apps (when desktop app not found)
fallback_apps = {
    "facebook": "https://www.facebook.com",
    "instagram": "https://www.instagram.com",
    "telegram": "https://web.telegram.org",
    "whatsapp": "https://web.whatsapp.com",
    "youtube": "https://www.youtube.com",
    "twitter": "https://twitter.com",
    "x": "https://twitter.com",
    "linkedin": "https://www.linkedin.com",
    "gmail": "https://mail.google.com",
    "google drive": "https://drive.google.com",
    "drive": "https://drive.google.com",
    "google docs": "https://docs.google.com",
    "docs": "https://docs.google.com",
    "google sheets": "https://sheets.google.com",
    "sheets": "https://sheets.google.com",
    "spotify": "https://open.spotify.com",
    "netflix": "https://www.netflix.com",
    "amazon": "https://www.amazon.com",
    "flipkart": "https://www.flipkart.com",
    "chatgpt": "https://chat.openai.com",
    "discord": "https://discord.com/app",
    "zoom": "https://zoom.us",
    "skype": "https://web.skype.com",
    "reddit": "https://www.reddit.com",
    "notion": "https://www.notion.so",
    "stackoverflow": "https://stackoverflow.com",
    "github": "https://github.com",
    "google meet": "https://meet.google.com",
    "meet": "https://meet.google.com",
    "microsoft teams": "https://teams.microsoft.com",
}

def GoogleSearch(Topic):
    search(Topic)
    return True

def Content(Topic):

    def OpenNotepad(File):
        default_text_editor = 'notepad.exe'
        subprocess.Popen([default_text_editor, File])

    def ContentWriterAI(prompt):
        message.append({"role": "user", "content": f"{prompt}"})

        completion = client.chat.completions.create(
            model="mixtral-8x7b-32768",
            messages=SystemChatBot + message,
            max_tokens=2048,
            temperature=0.7,
            top_p=1,
            stream=True,
            stop=None
        )

        Answer = ""
        for chunk in completion:
            if chunk.choices[0].delta.content:
                Answer += chunk.choices[0].delta.content

        Answer = Answer.replace("</s>", "")
        message.append({"role": "assistant", "content": Answer})
        return Answer

    Topic: str = Topic.replace("Content ", "")
    filename = rf"Data\{Topic.lower().replace(' ','')}.txt"
    ContentByAI = ContentWriterAI(Topic)

    with open(filename, "w", encoding="utf-8") as file:
        file.write(ContentByAI)

    OpenNotepad(filename)
    return True

def YouTubeSearch(Topic):
    Url4Search = f"https://www.youtube.com/results?search_query={Topic}"
    webbrowser.open(Url4Search)
    return True

def PlayYouTube(query):
    playonyt(query)
    return True

def OpenApp(app, sess=requests.session()):
    app = app.lower()

    try:
        appopen(app, match_closest=True, output=True, throw_error=True)
        print(f"[green]Opened {app} successfully.[/green]")
        return True

    except Exception as e:
        print(f"[yellow]App '{app}' could not be opened directly: {e}[/yellow]")

        # Fallback using known URLs
        if app in fallback_apps:
            print(f"[cyan]Using fallback URL for '{app}'[/cyan]")
            webopen(fallback_apps[app])
            return True

        # Fallback using Google search
        def extract_links(html):
            if html is None:
                return []
            soup = BeautifulSoup(html, 'html.parser')
            links = soup.find_all('a', {'jsname': 'UWckNb'})
            return [link.get('href') for link in links if link.get('href')]

        def search_google(query):
            url = f"https://www.google.com/search?q={query}"
            headers = {"User-Agent": useragent}
            response = sess.get(url, headers=headers)
            return response.text if response.status_code == 200 else None

        html = search_google(app)
        links = extract_links(html)

        if links:
            print(f"[green]Opening fallback search result: {links[0]}[/green]")
            webopen(links[0])
        else:
            print(f"[red]No fallback found for '{app}'[/red]")

        return True

def CloseApp(app):
    if "chrome" in app:
        return True
    try:
        close(app, match_closest=True, output=True, throw_error=True)
        print(f"[green]Closed {app} successfully.[/green]")
        return True
    except Exception as e:
        print(f"[yellow]Could not close {app}: {e}[/yellow]")
        return False

def System(command):
    def mute(): keyboard.press_and_release("volume mute")
    def unmute(): keyboard.press_and_release("volume mute")
    def volume_up(): keyboard.press_and_release("volume up")
    def volume_down(): keyboard.press_and_release("volume down")

    if command == "mute":
        mute()
    elif command == "unmute":
        unmute()
    elif command == "volume up":
        volume_up()
    elif command == "volume down":
        volume_down()

    return True

async def TranslateAndExecute(commands: list[str]):
    funcs = []

    for command in commands:
        cmd = command.lower().strip()

        if cmd.startswith("open "):
            fun = asyncio.to_thread(OpenApp, cmd.removeprefix("open "))
            funcs.append(fun)

        elif cmd.startswith("close "):
            fun = asyncio.to_thread(CloseApp, cmd.removeprefix("close "))
            funcs.append(fun)

        elif cmd.startswith("play "):
            fun = asyncio.to_thread(PlayYouTube, cmd.removeprefix("play "))
            funcs.append(fun)

        elif cmd.startswith("content "):
            fun = asyncio.to_thread(Content, cmd.removeprefix("content "))
            funcs.append(fun)

        elif cmd.startswith("google search "):
            fun = asyncio.to_thread(GoogleSearch, cmd.removeprefix("google search "))
            funcs.append(fun)

        elif cmd.startswith("youtube search "):
            fun = asyncio.to_thread(YouTubeSearch, cmd.removeprefix("youtube search "))
            funcs.append(fun)

        elif cmd.startswith("system "):
            fun = asyncio.to_thread(System, cmd.removeprefix("system "))
            funcs.append(fun)

        else:
            print(f"[red]No function found for: {command}[/red]")

    results = await asyncio.gather(*funcs)

    for result in results:
        yield result

async def Automation(commands: list[str]):
    async for result in TranslateAndExecute(commands):
        pass
    return True

if __name__ == "__main__":
    asyncio.run(Automation([
        "open facebook",
        "open instagram",
        "open telegram",
        "open github",
        "open notion",
        "play lo-fi chill beats",
        "system volume up"
    ]))
