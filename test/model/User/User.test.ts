import User from '@/model/User';
import UserBuilder from '@/test/data/builder/User/UserBuilder';

describe('Entity - User', () => {
  const props = UserBuilder.aUser().build();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Creation', () => {
    it('should create a user on success', () => {
      const user = new User(props);

      expect(user).toBeDefined();
      expect(user).toBeInstanceOf(User);
      expect(user.id.value).toBeDefined();
    });
  });

  describe('validate()', () => {
    it('should return notifications for an invalid name', () => {
      const props = UserBuilder.aUser().withInvalidName().build();
      const user = new User(props);
      user.validate();

      const { success, notifications } = user.validate();
      expect(success).toBeFalsy();
      expect(notifications).toStrictEqual([
        'Nome não pode ser vazio!',
        'Nome não pode ter menos que 3 caracteres!',
      ]);
    });

    it('should return notifications for an invalid email', () => {
      const props = UserBuilder.aUser().withInvalidEmail().build();
      const user = new User(props);
      user.validate();

      const { success, notifications } = user.validate();
      expect(success).toBeFalsy();
      expect(notifications).toStrictEqual([
        'Email deve ser um endereço de e-mail válido!',
      ]);
    });

    it('should return notifications for an invalid password', () => {
      const props = UserBuilder.aUser().withInvalidPassword().build();
      const user = new User(props);
      user.validate();

      const { success, notifications } = user.validate();
      expect(success).toBeFalsy();
      expect(notifications).toStrictEqual([
        'Senha Hash não corresponde ao padrão esperado!',
      ]);
    });

    it('should return success for a valid person name', () => {
      const user = new User(props);
      const { success, notifications } = user.validate();

      expect(success).toBeTruthy();
      expect(notifications).toStrictEqual([]);
    });
  });
});
