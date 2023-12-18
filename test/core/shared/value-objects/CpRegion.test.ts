import CpfRegion from '@/core/shared/value-objects/CpfRegion';

describe('Value Object - CpfRegion', () => {
  it('ensures that returns the RS region to region code 0', () => {
    const regionCode = 0;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('RS');
  });

  it('ensures that returns the RS region if the cpf entered belongs to region 0', () => {
    const cpf = '345.799.510-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('RS');
  });

  it('ensures that returns the DF region to region code 1', () => {
    const regionCode = 1;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('DF');
  });

  it('ensures that returns the DF region if the cpf entered belongs to region 1', () => {
    const cpf = '345.799.511-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('DF');
  });

  it('ensures that returns the GO region to region code 1', () => {
    const regionCode = 1;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('GO');
  });

  it('ensures that returns the GO region if the cpf entered belongs to region 1', () => {
    const cpf = '345.799.511-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('GO');
  });

  it('ensures that returns the MS region to region code 1', () => {
    const regionCode = 1;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('MS');
  });

  it('ensures that returns the MS region if the cpf entered belongs to region 1', () => {
    const cpf = '345.799.511-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('MS');
  });

  it('ensures that returns the MT region to region code 1', () => {
    const regionCode = 1;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('MT');
  });

  it('ensures that returns the MT region if the cpf entered belongs to region 1', () => {
    const cpf = '345.799.511-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('MT');
  });

  it('ensures that returns the TO region to region code 1', () => {
    const regionCode = 1;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('TO');
  });

  it('ensures that returns the TO region if the cpf entered belongs to region 1', () => {
    const cpf = '345.799.511-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('TO');
  });

  it('ensures that returns the AC region to region code 2', () => {
    const regionCode = 2;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('AC');
  });

  it('ensures that returns the AC region if the cpf entered belongs to region 2', () => {
    const cpf = '345.799.512-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('AC');
  });

  it('ensures that returns the AM region to region code 2', () => {
    const regionCode = 2;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('AM');
  });

  it('ensures that returns the AM region if the cpf entered belongs to region 2', () => {
    const cpf = '345.799.512-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('AM');
  });

  it('ensures that returns the AP region to region code 2', () => {
    const regionCode = 2;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('AP');
  });

  it('ensures that returns the AP region if the cpf entered belongs to region 2', () => {
    const cpf = '345.799.512-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('AP');
  });

  it('ensures that returns the PA region to region code 2', () => {
    const regionCode = 2;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('PA');
  });

  it('ensures that returns the PA region if the cpf entered belongs to region 2', () => {
    const cpf = '345.799.512-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('PA');
  });

  it('ensures that returns the RO region to region code 2', () => {
    const regionCode = 2;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('RO');
  });

  it('ensures that returns the RO region if the cpf entered belongs to region 2', () => {
    const cpf = '345.799.512-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('RO');
  });

  it('ensures that returns the RR region to region code 2', () => {
    const regionCode = 2;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('RR');
  });

  it('ensures that returns the RR region if the cpf entered belongs to region 2', () => {
    const cpf = '345.799.512-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('RR');
  });

  it('ensures that returns the CE region to region code 3', () => {
    const regionCode = 3;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('CE');
  });

  it('ensures that returns the CE region if the cpf entered belongs to region 3', () => {
    const cpf = '345.799.513-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('CE');
  });

  it('ensures that returns the MA region to region code 3', () => {
    const regionCode = 3;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('MA');
  });

  it('ensures that returns the MA region if the cpf entered belongs to region 3', () => {
    const cpf = '345.799.513-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('MA');
  });

  it('ensures that returns the PI region to region code 3', () => {
    const regionCode = 3;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('PI');
  });

  it('ensures that returns the PI region if the cpf entered belongs to region 3', () => {
    const cpf = '345.799.513-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('PI');
  });

  it('ensures that returns the AL region to region code 4', () => {
    const regionCode = 4;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('AL');
  });

  it('ensures that returns the AL region if the cpf entered belongs to region 4', () => {
    const cpf = '345.799.514-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('AL');
  });

  it('ensures that returns the PB region to region code 4', () => {
    const regionCode = 4;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('PB');
  });

  it('ensures that returns the PB region if the cpf entered belongs to region 4', () => {
    const cpf = '345.799.514-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('PB');
  });

  it('ensures that returns the PE region to region code 4', () => {
    const regionCode = 4;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('PE');
  });

  it('ensures that returns the PE region if the cpf entered belongs to region 4', () => {
    const cpf = '345.799.514-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('PE');
  });

  it('ensures that returns the RN region to region code 4', () => {
    const regionCode = 4;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('RN');
  });

  it('ensures that returns the RN region if the cpf entered belongs to region 4', () => {
    const cpf = '345.799.514-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('RN');
  });

  it('ensures that returns the BA region to region code 5', () => {
    const regionCode = 5;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('BA');
  });

  it('ensures that returns the BA region if the cpf entered belongs to region 5', () => {
    const cpf = '345.799.515-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('BA');
  });

  it('ensures that returns the SE region to region code 5', () => {
    const regionCode = 5;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('SE');
  });

  it('ensures that returns the SE region if the cpf entered belongs to region 5', () => {
    const cpf = '345.799.515-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('SE');
  });

  it('ensures that returns the MG region to region code 6', () => {
    const regionCode = 6;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('MG');
  });

  it('ensures that returns the MG region if the cpf entered belongs to region 6', () => {
    const cpf = '345.799.516-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('MG');
  });

  it('ensures that returns the ES region to region code 7', () => {
    const regionCode = 7;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('ES');
  });

  it('ensures that returns the ES region if the cpf entered belongs to region 7', () => {
    const cpf = '345.799.517-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('ES');
  });

  it('ensures that returns the RJ region to region code 7', () => {
    const regionCode = 7;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('RJ');
  });

  it('ensures that returns the RJ region if the cpf entered belongs to region 7', () => {
    const cpf = '345.799.517-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('RJ');
  });

  it('ensures that returns the SP region to region code 8', () => {
    const regionCode = 8;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('SP');
  });

  it('ensures that returns the SP region if the cpf entered belongs to region 8', () => {
    const cpf = '345.799.518-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('SP');
  });

  it('ensures that returns the PR region to region code 9', () => {
    const regionCode = 9;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('PR');
  });

  it('ensures that returns the PR region if the cpf entered belongs to region 9', () => {
    const cpf = '345.799.519-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('PR');
  });

  it('ensures that returns the SC region to region code 9', () => {
    const regionCode = 9;
    const region = CpfRegion.getByCode(regionCode);

    expect(region.code).toBe(regionCode);
    expect(region.states).toContain('SC');
  });

  it('ensures that returns the SC region if the cpf entered belongs to region 9', () => {
    const cpf = '345.799.519-93';
    const region = CpfRegion.getByCpf(cpf);

    expect(region.states).toContain('SC');
  });
});
