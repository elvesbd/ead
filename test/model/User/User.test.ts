import User from '@/model/User';
import UserBuilder from '@/test/data/builder/User/UserBuilder';

describe('Entity - User', () => {
  let user: User;
  const props = UserBuilder.aUser().build();

  beforeEach(() => {
    jest.clearAllMocks();
    user = new User(props);
  });

  describe('Creation', () => {
    it('should create a user on success', () => {
      const user = new User(props);

      expect(user).toBeDefined();
      expect(user).toBeInstanceOf(User);
    });
  });

  describe('getProps()', () => {
    it('should return user props on success', () => {
      const result = user.getProps();
      expect(result).toStrictEqual(props);
    });
  });

  describe('isValid()', () => {
    it('should return true if user is valid', () => {
      const result = user.isValid();
      expect(result).toBeTruthy();
    });

    it('should return false ir user is not valid', () => {
      const props = UserBuilder.aUser().withInvalidName().build();
      const user = new User(props);
      const result = user.isValid();
      expect(result).toBeFalsy();
    });
  });

  describe('getNotifications()', () => {
    it('should return notifications for an invalid name', () => {
      const props = UserBuilder.aUser().withInvalidName().build();
      const user = new User(props);
      const expectedResult = {
        Nome: [
          'Nome não pode ser vazio!',
          'Nome não pode ter menos que 3 caracteres!',
        ],
      };

      const result = user.notifications;

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications for an invalid email', () => {
      const props = UserBuilder.aUser().withInvalidEmail().build();
      const user = new User(props);

      const expectedResult = {
        Email: ['Email deve ser um endereço de e-mail válido!'],
      };

      const result = user.notifications;

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications for an invalid password', () => {
      const props = UserBuilder.aUser().withInvalidPassword().build();
      const user = new User(props);

      const expectedResult = {
        Senha: ['Senha não corresponde ao padrão esperado!'],
      };

      const result = user.notifications;

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return success for a valid person name', () => {
      const user = new User(props);

      const result = user.notifications;

      expect(result).toStrictEqual({});
    });
  });
});
