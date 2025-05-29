
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Info } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-8 flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Info size={16} />
              Sobre o GoINFT
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black text-white border-gray-800 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#FFEB3B] mb-4">
                GoINFT - Football NFT Stickers
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#FFEB3B]">Objetivo</h3>
                <p className="text-gray-300">
                  O GoINFT é uma plataforma revolucionária que combina a paixão pelo futebol com a inovação da tecnologia blockchain. 
                  Nosso objetivo é criar um ecossistema completo para colecionadores de NFTs de futebol.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#FFEB3B]">O que fazemos</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• <strong>Colecione:</strong> Adquira figurinhas NFT únicas de jogadores de futebol</li>
                  <li>• <strong>Troque:</strong> Negocie suas cartas com outros colecionadores</li>
                  <li>• <strong>Complete Álbuns:</strong> Monte coleções completas e ganhe recompensas</li>
                  <li>• <strong>Marketplace:</strong> Compre e venda NFTs em nosso mercado descentralizado</li>
                  <li>• <strong>Desafios:</strong> Participe de competições e eventos especiais</li>
                  <li>• <strong>Comunidade:</strong> Conecte-se com outros fãs de futebol e colecionadores</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#FFEB3B]">Tecnologia</h3>
                <p className="text-gray-300">
                  Construído na BNB Chain para transações rápidas e econômicas, com integração MetaMask 
                  para uma experiência segura e descentralizada.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#FFEB3B]">Parceiros</h3>
                <p className="text-gray-300">
                  Confiado por BNB Chain, Binance e MetaMask, garantindo segurança e qualidade 
                  em todas as transações.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </footer>
  );
};
