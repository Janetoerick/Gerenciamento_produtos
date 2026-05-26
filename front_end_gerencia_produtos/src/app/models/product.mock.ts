import { Product } from './product.model';

export const MOCK_PRODUCTS: Product[] = [
  // --- ELETRÔNICOS ---
  { id: 1, name: 'Teclado Mecânico RGB', description: 'Switch Blue com retroiluminação e layout ABNT2', price: 249.90, category: 'Eletrônicos', active: true },
  { id: 2, name: 'Monitor Gamer 24" 144Hz', description: 'Painel IPS com 1ms de tempo de resposta', price: 1150.00, category: 'Eletrônicos', active: false },
  { id: 3, name: 'Mouse Sem Fio Vertical', description: 'Design ergonômico para redução de lesões por esforço', price: 189.90, category: 'Eletrônicos', active: true },
  { id: 4, name: 'Smartphone Pro 128GB', description: 'Câmera tripla e tela OLED de 6.1 polegadas', price: 4500.00, category: 'Eletrônicos', active: true },
  { id: 5, name: 'Fone de Ouvido Bluetooth Bluetooth', description: 'Cancelamento de ruído ativo e bateria de 40h', price: 599.00, category: 'Eletrônicos', active: true },
  { id: 6, name: 'Carregador por Indução Fast', description: 'Compatível com padrão Qi de até 15W', price: 120.00, category: 'Eletrônicos', active: true },
  { id: 7, name: 'Hub USB-C 7 em 1', description: 'Saída HDMI 4K, portas USB 3.0 e leitores de cartão', price: 210.50, category: 'Eletrônicos', active: false },
  { id: 8, name: 'Suporte Articulado para Monitor', description: 'Pistão a gás com ajuste de altura e rotação de 180°C', price: 280.00, category: 'Eletrônicos', active: true },
  { id: 9, name: 'Caixa de Som Bluetooth Pro', description: 'Resistente à água IPX7 com potência de 30W RMS', price: 450.00, category: 'Eletrônicos', active: true },
  { id: 10, name: 'Webcam Full HD 1080p', description: 'Microfone embutido e foco automático para streaming', price: 320.00, category: 'Eletrônicos', active: true },

  // --- MÓVEIS ---
  { id: 11, name: 'Cadeira Ergonômica Office', description: 'Ajuste de braço e suporte lombar em tecido mesh', price: 899.00, category: 'Móveis', active: true },
  { id: 12, name: 'Mesa de Escritório em L', description: 'Tampo de madeira MDP com pés de aço industrial', price: 420.00, category: 'Móveis', active: true },
  { id: 13, name: 'Gaveteiro Organizador com Chave', description: '3 gavetas com rodízios para escritório', price: 245.00, category: 'Móveis', active: true },
  { id: 14, name: 'Estante para Livros Industrial', description: 'Estrutura metálica preta com 5 prateleiras amadeiradas', price: 380.00, category: 'Móveis', active: false },
  { id: 15, name: 'Luminária de Mesa Articulada', description: 'Base pesada e bocal E27 para lâmpada LED', price: 89.90, category: 'Móveis', active: true },
  { id: 16, name: 'Poltrona Confort Slim', description: 'Revestimento em corino com pés palito de madeira', price: 650.00, category: 'Móveis', active: true },
  { id: 17, name: 'Aparador de Livros Minimalista', description: 'Feito em aço carbono cortado a laser', price: 45.00, category: 'Móveis', active: true },
  { id: 18, name: 'Mesa de Cabeceira Retrô', description: 'Duas gavetas com puxadores de couro legítimo', price: 179.00, category: 'Móveis', active: false },

  // --- VESTUÁRIO ---
  { id: 19, name: 'Camiseta Algodão Premium', description: 'Fio 30.1 penteado, cor preta lisa unissex', price: 59.90, category: 'Vestuário', active: true },
  { id: 20, name: 'Tênis Esportivo Running', description: 'Amortecimento em gel para corridas e treinos leves', price: 299.99, category: 'Vestuário', active: false },
  { id: 21, name: 'Calça Sarja Slim', description: 'Modelagem moderna com elastano, cor cáqui', price: 139.90, category: 'Vestuário', active: true },
  { id: 22, name: 'Jaqueta Corta-Vento', description: 'Tecido impermeável com capuz regulável para ciclismo', price: 189.00, category: 'Vestuário', active: true },
  { id: 23, name: 'Meias Cano Alto Kit x3', description: 'Algodão respirável ideal para uso diário', price: 39.90, category: 'Vestuário', active: true },
  { id: 24, name: 'Blusa de Moletom Canguru', description: 'Interior flanelado com bolso frontal e ajuste', price: 159.90, category: 'Vestuário', active: true },
  { id: 25, name: 'Boné Strapback Aba Curva', description: 'Feito em brim lavado com ajuste em fivela', price: 75.00, category: 'Vestuário', active: true },
  { id: 26, name: 'Bermuda Tactel Casual', description: 'Secagem rápida com bolsos laterais de zíper', price: 69.90, category: 'Vestuário', active: false },

  // --- ALIMENTOS ---
  { id: 27, name: 'Café Espresso Gourmet', description: 'Grãos torrados 100% Arábica do Sul de Minas 500g', price: 34.90, category: 'Alimentos', active: true },
  { id: 28, name: 'Chocolate Amargo 70%', description: 'Barra de chocolate orgânico com cacau fino da Bahia', price: 14.50, category: 'Alimentos', active: true },
  { id: 29, name: 'Azeite de Oliva Extravirgem', description: 'Acidez máxima de 0.2% prensado a frio 500ml', price: 42.90, category: 'Alimentos', active: true },
  { id: 30, name: 'Pasta de Amendoim Integral', description: 'Zero açúcar e sem conservantes, pote de 1kg', price: 22.00, category: 'Alimentos', active: true },
  { id: 31, name: 'Chá Verde Orgânico Box', description: '30 sachês selecionados de folhas de Camellia sinensis', price: 18.90, category: 'Alimentos', active: false },
  { id: 32, name: 'Mel Silvestre Natural', description: 'Mel puro de abelha em bisnaga anti-gotejamento 400g', price: 28.50, category: 'Alimentos', active: true },
  { id: 33, name: 'Granola Artesanal Crocante', description: 'Mix de castanhas, sementes e frutas secas 1kg', price: 31.90, category: 'Alimentos', active: true },
  { id: 34, name: 'Biscoito de Arroz Integral', description: 'Sem glúten e baixo teor de sódio, pacote 150g', price: 8.90, category: 'Alimentos', active: true },
  { id: 35, name: 'Suco de Uva Integral tinto', description: 'Sem adição de água ou açúcares, garrafa de 1L', price: 16.90, category: 'Alimentos', active: false }
];