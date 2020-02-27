#!/bin/bash

echo "------------------------------------------"
echo "		Actualización del repo		"
echo "------------------------------------------"
echo ""
git pull
sleep 3
clear
echo "------------------------------------------"
echo "		Subiendo cambios		"
echo "------------------------------------------"
echo ""
git add  index.*
git nota "Principal page of the quiz game project"
git sube
echo "-------------------------------------------"
echo ""
git add game.*
git nota "Game page of the quiz project"
git sube
echo "-------------------------------------------"
echo ""
git add score.*
git nota "Score page of the quiz project"
git sube
echo "-------------------------------------------"
echo ""
git add up.sh
git nota "Update the repository in GitHub"
git sube
echo "-------------------------------------------"
echo ""
echo "+--------------------------------------------------+"
echo "| Fin de ejecución del script - Actualizando repo. |"
echo "+--------------------------------------------------+"
read -p "Pulse ENTER para salir" salir
clear
sleep 2
echo "再见"
sleep 5
clear

