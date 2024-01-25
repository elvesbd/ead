export default class ChapterNames {
  static readonly names = [
    'Teoria',
    'Prática',
    'Desafios',
    'Conclusão',
    'Introdução',
    'Fundamentos',
    'Conceitos Básicos',
    'Configuração do Ambiente',
  ];

  static get(): string {
    const index = Math.floor(Math.random() * ChapterNames.names.length);
    return ChapterNames.names[index];
  }
}
