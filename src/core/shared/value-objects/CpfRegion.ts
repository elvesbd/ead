export default class CpfRegion {
  static readonly AllRegions = [
    new CpfRegion(0, ['RS']),
    new CpfRegion(1, ['DF', 'GO', 'MS', 'MT', 'TO']),
    new CpfRegion(2, ['AC', 'AM', 'AP', 'PA', 'RO', 'RR']),
    new CpfRegion(3, ['CE', 'MA', 'PI']),
    new CpfRegion(4, ['AL', 'PB', 'PE', 'RN']),
    new CpfRegion(5, ['BA', 'SE']),
    new CpfRegion(6, ['MG']),
    new CpfRegion(7, ['ES', 'RJ']),
    new CpfRegion(8, ['SP']),
    new CpfRegion(9, ['PR', 'SC']),
  ];

  private constructor(
    readonly code: number,
    readonly states: string[]
  ) {}

  static readonly RS: CpfRegion = CpfRegion.AllRegions[0];
  static readonly DF_GO_MS_MT_TO: CpfRegion = CpfRegion.AllRegions[1];
  static readonly AC_AM_AP_PA_RO_RR: CpfRegion =
    CpfRegion.AllRegions[2];
  static readonly CE_MA_PI: CpfRegion = CpfRegion.AllRegions[3];
  static readonly AL_PB_PE_RN: CpfRegion = CpfRegion.AllRegions[4];
  static readonly BA_SE: CpfRegion = CpfRegion.AllRegions[5];
  static readonly MG: CpfRegion = CpfRegion.AllRegions[6];
  static readonly ES_RJ: CpfRegion = CpfRegion.AllRegions[7];
  static readonly SP: CpfRegion = CpfRegion.AllRegions[8];
  static readonly PR_SC: CpfRegion = CpfRegion.AllRegions[9];

  static getByCode(regionCode: number): CpfRegion {
    return CpfRegion.AllRegions[regionCode];
  }

  static getByCpf(cpf: string): CpfRegion {
    const regionCode = +cpf.replace(/\D/g, '')[8];
    return CpfRegion.AllRegions[regionCode];
  }
}
