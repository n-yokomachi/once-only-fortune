import { useState } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Container,
  Alert,
  defaultSystem,
} from '@chakra-ui/react';
import { css, keyframes } from '@emotion/react';

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
  50% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.8); }
`;

const burn = keyframes`
  0% { opacity: 1; filter: brightness(1); }
  50% { opacity: 0.5; filter: brightness(2) sepia(1) saturate(5); }
  100% { opacity: 0; filter: brightness(0); }
`;

interface Fortune {
  result: string;
  message: string;
  color: string;
  willDestroy?: boolean;
}

function App() {
  const [fortune, setFortune] = useState<Fortune | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDestroying, setIsDestroying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const drawFortune = async () => {
    setIsDrawing(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/fortune', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 410) {
        const data = await response.json();
        setError(data.error);
        setIsDrawing(false);
        return;
      }

      const data: Fortune = await response.json();
      setFortune(data);
      setIsDrawing(false);

      // 自己破壊アニメーション開始
      setTimeout(() => {
        setIsDestroying(true);
      }, 3000);
    } catch {
      setError('サーバーに接続できません。既に破壊されている可能性があります。');
      setIsDrawing(false);
    }
  };

  return (
    <ChakraProvider value={defaultSystem}>
      <Box
        minH="100vh"
        bgGradient="to-b"
        gradientFrom="purple.900"
        gradientTo="gray.900"
        py={10}
        css={isDestroying ? css`animation: ${burn} 5s forwards;` : undefined}
      >
        <Container maxW="md">
          <VStack gap={8}>
            <VStack gap={2}>
              <Text fontSize="6xl">⛩️</Text>
              <Heading
                color="yellow.300"
                fontSize="4xl"
                textShadow="0 0 10px rgba(255, 215, 0, 0.5)"
              >
                禅みくじ
              </Heading>
              <Text color="gray.400" fontSize="sm">
                ～ 一期一会のおみくじ ～
              </Text>
            </VStack>

            {error && (
              <Alert.Root status="error" borderRadius="md">
                <Alert.Indicator />
                <Box>
                  <Alert.Title>エラー</Alert.Title>
                  <Alert.Description>{error}</Alert.Description>
                </Box>
              </Alert.Root>
            )}

            {!fortune && !error && (
              <VStack gap={6}>
                <Box
                  bg="red.900"
                  p={6}
                  borderRadius="lg"
                  border="2px solid"
                  borderColor="red.600"
                >
                  <Text color="red.200" fontWeight="bold" textAlign="center">
                    ⚠️ 警告 ⚠️
                  </Text>
                  <Text color="red.300" fontSize="sm" mt={2} textAlign="center">
                    このおみくじは一度しか引けません。
                    <br />
                    引いた瞬間、このアプリは
                    <Text as="span" color="red.100" fontWeight="bold">
                      自己破壊
                    </Text>
                    します。
                  </Text>
                </Box>

                <Button
                  size="lg"
                  colorPalette="yellow"
                  onClick={drawFortune}
                  loading={isDrawing}
                  loadingText="運命を占っています..."
                  css={css`
                    animation: ${glow} 2s infinite;
                    &:hover {
                      transform: scale(1.05);
                      animation: ${shake} 0.5s;
                    }
                  `}
                  px={12}
                  py={8}
                  fontSize="xl"
                >
                  🎋 おみくじを引く
                </Button>
              </VStack>
            )}

            {fortune && (
              <VStack gap={6}>
                <Box
                  bg="gray.800"
                  p={8}
                  borderRadius="xl"
                  border="4px solid"
                  borderColor={fortune.color}
                  boxShadow={`0 0 30px ${fortune.color}`}
                  textAlign="center"
                  minW="300px"
                >
                  <Text
                    fontSize="6xl"
                    fontWeight="black"
                    color={fortune.color}
                    textShadow={`0 0 20px ${fortune.color}`}
                  >
                    {fortune.result}
                  </Text>
                  <Text color="gray.300" mt={4} fontSize="lg">
                    {fortune.message}
                  </Text>
                </Box>

                {isDestroying && (
                  <Box textAlign="center">
                    <Text color="red.400" fontSize="lg" fontWeight="bold">
                      🔥 自己破壊シーケンス実行中... 🔥
                    </Text>
                    <Text color="gray.500" fontSize="sm" mt={2}>
                      ソースコードが削除されています...
                    </Text>
                    <Text color="gray.600" fontSize="xs" mt={4}>
                      さようなら...
                    </Text>
                  </Box>
                )}
              </VStack>
            )}

            <Text color="gray.600" fontSize="xs" mt={8}>
              このアプリは一度しか使用できません
            </Text>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
