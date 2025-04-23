#!/bin/bash

# Session Name
session="stock-accounting"

SESSIONEXISTS=$(tmux list-sessions | grep $session)

if [ "$SESSIONEXISTS" = "" ]
then
  # Start New Session with our name
  tmux new-session -d -s $session

  tmux rename-window -t 1 'IDE'

  tmux send-keys -t 'IDE' 'nvim' C-m

  tmux new-window -t $session:2 -n 'Server'
fi

tmux attach-session -t $session:1
