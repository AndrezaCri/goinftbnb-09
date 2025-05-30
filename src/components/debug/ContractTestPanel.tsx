
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useContractTest } from '@/hooks/useContractTest';
import { useContract } from '@/hooks/useContract';
import { CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';

export const ContractTestPanel = () => {
  const { isConnected, isCorrectNetwork } = useContract();
  const { isTestingConnection, connectionResults, testContracts } = useContractTest();

  const getStatusIcon = (connected: boolean, isLoading: boolean) => {
    if (isLoading) return <Loader2 className="h-4 w-4 animate-spin" />;
    return connected ? 
      <CheckCircle className="h-4 w-4 text-green-500" /> : 
      <XCircle className="h-4 w-4 text-red-500" />;
  };

  const getStatusBadge = (connected: boolean) => {
    return connected ? 
      <Badge variant="default" className="bg-green-500">Conectado</Badge> :
      <Badge variant="destructive">Desconectado</Badge>;
  };

  if (!isConnected || !isCorrectNetwork) {
    return (
      <Card className="border-yellow-500">
        <CardHeader>
          <CardTitle className="text-yellow-500">⚠️ Pré-requisitos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Conecte-se à rede BSC Testnet para testar os contratos.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>🔗 Status dos Contratos</CardTitle>
          <Button 
            onClick={testContracts}
            disabled={isTestingConnection}
            size="sm"
            variant="outline"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Testar Conexão
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* NFT Contract */}
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center gap-3">
            {getStatusIcon(connectionResults.nft.connected, isTestingConnection)}
            <div>
              <p className="font-medium">NFT Contract</p>
              <p className="text-xs text-muted-foreground">0xB094...9c29</p>
              {connectionResults.nft.name && (
                <p className="text-xs text-blue-500">
                  {connectionResults.nft.name} ({connectionResults.nft.symbol})
                </p>
              )}
              {connectionResults.nft.error && (
                <p className="text-xs text-red-500">{connectionResults.nft.error}</p>
              )}
            </div>
          </div>
          {getStatusBadge(connectionResults.nft.connected)}
        </div>

        {/* Marketplace Contract */}
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center gap-3">
            {getStatusIcon(connectionResults.marketplace.connected, isTestingConnection)}
            <div>
              <p className="font-medium">Marketplace Contract</p>
              <p className="text-xs text-muted-foreground">0x14d6...b9c7</p>
              {connectionResults.marketplace.fee && (
                <p className="text-xs text-blue-500">
                  Taxa: {connectionResults.marketplace.fee}%
                </p>
              )}
              {connectionResults.marketplace.error && (
                <p className="text-xs text-red-500">{connectionResults.marketplace.error}</p>
              )}
            </div>
          </div>
          {getStatusBadge(connectionResults.marketplace.connected)}
        </div>

        {isTestingConnection && (
          <div className="text-center py-4">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Testando conexão com contratos...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
