//import { mount } from '@vue/test-utils'

const { shallowMount } = require('@vue/test-utils');
const LoginComponent = require('@/components/LoginComponent.vue');



jest.mock('axios');

describe('LoginComponent', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(LoginComponent);
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('calls axios.get to fetch clients data on component mount', async () => {
        const clients = [{ mail: 'test1@example.com', password: '123' }, { mail: 'test2@example.com', password: '456' }];
        axios.get.mockResolvedValue({ data: clients });
        await wrapper.vm.$options.mounted.call(wrapper.vm);
        expect(axios.get).toHaveBeenCalledWith('/api/clients');
        expect(wrapper.vm.clients).toEqual(clients);
    });

    it('returns true if email and password match with any client', () => {
        const clients = [{ mail: 'test1@example.com', password: '123' }, { mail: 'test2@example.com', password: '456' }];
        wrapper.vm.clients = clients;
        wrapper.vm.email = 'test2@example.com';
        wrapper.vm.password = '456';
        expect(wrapper.vm.login_compare()).toBe(true);
    });

    it('returns false if email and password do not match with any client', () => {
        const clients = [{ mail: 'test1@example.com', password: '123' }, { mail: 'test2@example.com', password: '456' }];
        wrapper.vm.clients = clients;
        wrapper.vm.email = 'test3@example.com';
        wrapper.vm.password = '789';
        expect(wrapper.vm.login_compare()).toBe(false);
    });

    it('navigates to profile route if login credentials are correct', () => {
        const clients = [{ mail: 'test1@example.com', password: '123' }, { mail: 'test2@example.com', password: '456' }];
        const push = jest.fn();
        wrapper.vm.$router = { push };
        wrapper.vm.clients = clients;
        wrapper.vm.email = 'test1@example.com';
        wrapper.vm.password = '123';
        wrapper.vm.loginSystem();
        expect(push).toHaveBeenCalledWith('./profile');
    });

    it('logs an error message if login credentials are incorrect', () => {
        const spy = jest.spyOn(console, 'log');
        wrapper.vm.email = 'test3@example.com';
        wrapper.vm.password = '789';
        wrapper.vm.loginSystem();
        expect(spy).toHaveBeenCalledWith('Nesprávné jméno nebo heslo');
        spy.mockRestore();
    });
});
