from Frontend.GUI import (
    GraphicalUserInterface,
    SetAssistantStatus,
    ShowTextToScreen,
    TempDirectoryPath,
    SetMicrophoneStatus,
    AnswerModifier,
    QueryModifier,
    GetMicrophoneStatus,
    GetAssistantStatus
)
from Backend.Model import FirstLayerDMM
from Backend.RealtimeSearchEngine import RealtimeSearchEngine
from Backend.Automation import Automation
from Backend.SpeechToText import SpeechRecognition
from Backend.Chatbot import ChatBot
from Backend.TextToSpeech import TextToSpeech
from dotenv import dotenv_values
from asyncio import run
from time import sleep
import subprocess
import threading
import json
import os

# Loading environment variables
env_vars = dotenv_values(".env")
Username = env_vars.get("Username")
Assistantname = env_vars.get("Assistantname")
DefaultMessage = f'''{Username} : Hello {Assistantname}, How are you?
{Assistantname} : Welcome {Username}. I am doing Well. How may I help you?'''
subprocess_processes = []  # Renamed to avoid conflict with subprocess module
Functions = ["open", "close", "play", "system", "content", "google search", "youtube search"]

# Show default chat if no previous chat exists
def ShowDefaultChatIfNoChats():
    try:
        with open(r'Data\ChatLog.json', "r", encoding='utf-8') as file:
            if len(file.read()) < 5:
                with open(TempDirectoryPath('Database.data'), 'w', encoding='utf-8') as file:
                    file.write("")
                with open(TempDirectoryPath('Responses.data'), 'w', encoding='utf-8') as file:
                    file.write(DefaultMessage)
    except FileNotFoundError as e:
        print(f"Error: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

# Read chat log JSON
def ReadChatLogJson():
    try:
        with open(r'Data\ChatLog.json', 'r', encoding='utf-8') as file:
            chatlog_data = json.load(file)
        return chatlog_data
    except FileNotFoundError as e:
        print(f"Error: {e}")
        return []
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {e}")
        return []

# Integrate the chat log into a formatted chat
def ChatLogIntegration():
    json_data = ReadChatLogJson()
    formatted_chatlog = ""
    for entry in json_data:
        if entry["role"] == "user":
            formatted_chatlog += f"User: {entry['content']}\n"
        elif entry["role"] == "assistant":
            formatted_chatlog += f"Assistant: {entry['content']}\n"
    formatted_chatlog = formatted_chatlog.replace("User", Username + " ")
    formatted_chatlog = formatted_chatlog.replace("Assistantname", Assistantname + " ")
    
    try:
        with open(TempDirectoryPath('Database.data'), 'w', encoding='utf-8') as file:
            file.write(AnswerModifier(formatted_chatlog))
    except Exception as e:
        print(f"Error writing to Database.data: {e}")

# Show chat on GUI
def ShowChatOnGUI():
    try:
        with open(TempDirectoryPath('Database.data'), "r", encoding='utf-8') as file:
            Data = file.read()
        if len(Data) > 0:
            lines = Data.split('\n')
            result = '\n'.join(lines)
            with open(TempDirectoryPath('Responses.data'), "w", encoding='utf-8') as file:
                file.write(result)
    except Exception as e:
        print(f"Error updating GUI with chat: {e}")

# Initial setup and execution
def InitialExecution():
    SetMicrophoneStatus("False")
    ShowTextToScreen("")
    ShowDefaultChatIfNoChats()
    ChatLogIntegration()
    ShowChatOnGUI()

InitialExecution()

# Main execution flow
def MainExecution():
    TaskExeution = False
    ImageExecution = False
    ImageGenerationQuery = ""

    SetAssistantStatus("Listening...")
    Query = SpeechRecognition()
    ShowTextToScreen(f"{Username} : {Query}")
    SetAssistantStatus("Thinking...")
    Decision = FirstLayerDMM(Query)

    print(f"\nDecision : {Decision}\n")

    G = any([i for i in Decision if i.startswith("general")])
    R = any([i for i in Decision if i.startswith("realtime")])

    Mearged_query = " and ".join(
        [" ".join(i.split()[1:]) for i in Decision if i.startswith("general") or i.startswith("realtime")]
    )

    # Handle image generation
    for queries in Decision:
        if "generate" in queries:
            ImageGenerationQuery = str(queries)
            ImageExecution = True

    # Handle automation tasks
    for queries in Decision:
        if TaskExeution == False:
            if any(queries.startswith(func) for func in Functions):
                run(Automation(list(Decision)))
                TaskExeution = True

    # Image generation
    if ImageExecution:
        with open(r"Fronted\Files\ImageGeneration.data", "w") as file:
            file.write(f"{ImageGenerationQuery},True")

        try:
            p1 = subprocess.Popen(
                ['python', r'Backend\ImageGeneration.py'],
                stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                stdin=subprocess.PIPE, shell=False
            )
            subprocess_processes.append(p1)
            stdout, stderr = p1.communicate()
            if stderr:
                print(f"Error during image generation: {stderr.decode()}")
        except Exception as e:
            print(f"Error starting ImageGeneration.py: {e}")

    # Search or chat response
    if G and R or R:
        SetAssistantStatus("Searching...")
        Answer = RealtimeSearchEngine(QueryModifier(Mearged_query))
        ShowTextToScreen(f"{Assistantname} : {Answer}")
        SetAssistantStatus("Answering...")
        TextToSpeech(Answer)
        return True

    else:
        for Queries in Decision:
            if "general" in Queries:
                SetAssistantStatus("Thinking...")
                QueryFinal = Queries.replace("general ", "")
                Answer = ChatBot(QueryModifier(QueryFinal))
                ShowTextToScreen(f"{Assistantname} : {Answer}")
                SetAssistantStatus("Answering...")
                TextToSpeech(Answer)
                return True

            elif "realtime" in Queries:
                SetAssistantStatus("Searching...")
                QueryFinal = Queries.replace("realtime", "")
                Answer = RealtimeSearchEngine(QueryModifier(QueryFinal))
                ShowTextToScreen(f"{Assistantname} : {Answer}")
                SetAssistantStatus("Answering...")
                TextToSpeech(Answer)
                return True

            elif "exit" in Queries:
                QueryFinal = "Okay , Bye!"
                Answer = ChatBot(QueryModifier(QueryFinal))
                ShowTextToScreen(f"{Assistantname} : {Answer}")
                SetAssistantStatus("Answering...")
                TextToSpeech(Answer)
                SetAssistantStatus("Answering...")
                os._exit(1)

# Thread for listening to microphone input
def FirstThread():
    while True:
        CurrentStatus = GetMicrophoneStatus()

        if CurrentStatus == "True":
            MainExecution()
        else:
            AIStatus = GetAssistantStatus()

            if "Available..." in AIStatus:
                sleep(0.1)
            else:
                SetAssistantStatus("Available...")

        sleep(0.5)  # Add a slight delay to avoid constant looping

# Thread for GUI
def SecondThread():
    while True:
        GraphicalUserInterface()
        sleep(1)  # Add a small delay to prevent constant re-rendering

# Main entry point
if __name__ == "__main__":
    thread2 = threading.Thread(target=FirstThread, daemon=True)
    thread2.start()
    SecondThread()
