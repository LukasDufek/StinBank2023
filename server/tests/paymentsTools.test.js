const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const PaymentsTools = require('../scripts/paymentsTools');
//const file = require('../file.txt');

jest.mock("axios");
//jest.mock("spyOn");


describe('PaymentsTools.load_all_clients', () => {
    it('should return an array of clients', async () => {
        const mockClientData = [
            {
                id: 1,
                name: 'Client A',
                email: 'clienta@example.com',
            },
            {
                id: 2,
                name: 'Client B',
                email: 'clientb@example.com',
            },
        ];
        axios.get.mockResolvedValue({ data: mockClientData });

        const result = await PaymentsTools.load_all_clients();

        expect(result).toEqual(mockClientData);
    });

    it('should handle errors and return an empty array', async () => {
        const errorMsg = 'Error: Could not load clients';
        axios.get.mockRejectedValue(errorMsg);

        const result = await PaymentsTools.load_all_clients();

        expect(result).toEqual([]);
    });
});



describe('is_same_client', () => {
    test('is_same_client_true', () => {
       const all_clients = [
           {
               name: 'safsa',
               accounts: [
                   {account_number: 1234}, {account_number: 4321}
               ]
           }
       ];

       expect(PaymentsTools.is_same_client(1234, all_clients)).toBe(true)
    })
    test('is_same_client_false', () => {
        const all_clients = [
            {
                name: 'safsa',
                accounts: [
                    {account_number: 1234}, {account_number: 4321}
                ]
            }
        ];

        expect(PaymentsTools.is_same_client(12354, all_clients)).toBe(false)
    })
});

describe("if_client_exist", () => {
    const client1 = { mail: "test1@test.com" };
    const client2 = { mail: "test2@test.com" };
    const all_clients = [client1, client2];

    it("returns true if client exists in all_clients array", () => {
        expect(PaymentsTools.if_client_exist("test1@test.com", all_clients)).toBe(true);
    });

    it("returns false if client does not exist in all_clients array", () => {
        expect(PaymentsTools.if_client_exist("test3@test.com", all_clients)).toBe(false);
    });
});



describe('PaymentsTools.create_new_account', () => {
    test('creates a new account with a random account number', () => {
        const currency = 'USD';
        const account = PaymentsTools.create_new_account(currency);

        expect(account).toHaveProperty('account_number');
        expect(typeof account.account_number).toBe('number');
    });

    test('sets the correct currency for the new account', () => {
        const currency = 'EUR';
        const account = PaymentsTools.create_new_account(currency);

        expect(account.currency).toBe(currency);
    });

    test('sets the balance to zero for the new account', () => {
        const currency = 'GBP';
        const account = PaymentsTools.create_new_account(currency);

        expect(account.balance).toBe(0);
    });

    test('initializes an empty payments array for the new account', () => {
        const currency = 'JPY';
        const account = PaymentsTools.create_new_account(currency);

        expect(account.payments).toEqual([]);
    });
});



describe('PaymentsTools.add_new_account_part', () => {
    test("Test přidání nového účtu", () => {
        const all_clients = [
            {mail: 'client1@example.com', accounts: [{name: 'account1'}]},
            {mail: 'client2@example.com', accounts: [{name: 'account2'}]},
        ];

        const actual_client = {mail: 'client1@example.com', accounts: [{name: 'account1'}]};
        const new_account = {name: 'account2'};

        const result = PaymentsTools.add_new_account_part(actual_client, new_account, all_clients);

        expect(result.accounts).toContainEqual(new_account);
        expect(all_clients).toContainEqual(result);
    });
});





describe('PaymentsTools', () => {
    describe('#convert_CZK_to_some', () => {
        const list_of_currencies = [
            { country_code: 'USD', amount: '1', course: '22.5' },
            { country_code: 'EUR', amount: '100', course: '26.2' },
            { country_code: 'GBP', amount: '1', course: '30.5' },
        ];

        beforeEach(() => {
            jest.spyOn(PaymentsTools, 'read_cnb_file').mockReturnValue(list_of_currencies);
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should convert CZK to USD when amount is 1', () => {
            const sum = 100;
            const to_currency = 'USD';
            const expected_return_sum = sum / parseFloat(list_of_currencies[0].course);
            const return_sum = PaymentsTools.convert_CZK_to_some(sum, to_currency);
            expect(return_sum).toEqual(expected_return_sum);
        });

        it('should convert CZK to EUR when amount is 100', () => {
            const sum = 100;
            const to_currency = 'EUR';
            const expected_return_sum = (sum * 100) / parseFloat(list_of_currencies[1].course);
            const return_sum = PaymentsTools.convert_CZK_to_some(sum, to_currency);
            expect(return_sum).toEqual(expected_return_sum);
        });

        it('should convert CZK to GBP when amount is 1', () => {
            const sum = 100;
            const to_currency = 'GBP';
            const expected_return_sum = sum / parseFloat(list_of_currencies[2].course);
            const return_sum = PaymentsTools.convert_CZK_to_some(sum, to_currency);
            expect(return_sum).toEqual(expected_return_sum);
        });

        it('should return 0 if the to_currency is not found in the list of currencies', () => {
            jest.spyOn(PaymentsTools, 'read_cnb_file').mockReturnValue([]);
            const sum = 100;
            const to_currency = 'JPY';
            const expected_return_sum = 0;
            const return_sum = PaymentsTools.convert_CZK_to_some(sum, to_currency);
            expect(return_sum).toEqual(expected_return_sum);
        });
    });
});

describe('PaymentsTools.convert_some_to_CZK', () => {
    describe('#convert_some_to_CZK', () => {
        const list_of_currencies = [
            { country_code: 'USD', amount: '1', course: '22.5' },
            { country_code: 'EUR', amount: '100', course: '26.2' },
            { country_code: 'GBP', amount: '1', course: '30.5' },
        ];

        beforeEach(() => {
            jest.spyOn(PaymentsTools, 'read_cnb_file').mockReturnValue(list_of_currencies);
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

    it('should convert sum from USD to CZK', () => {
        const sum = 100;
        const from_currency = 'USD';

        const expectedReturnSum = sum * parseFloat(list_of_currencies[0].course);
        const returnSum = PaymentsTools.convert_some_to_CZK(sum, from_currency);

        expect(returnSum).toBe(expectedReturnSum);
    });

    it('should convert sum from EUR to CZK', () => {
        const sum = 100;
        const from_currency = 'EUR';

        const expectedReturnSum = (sum / 100) * parseFloat(list_of_currencies[1].course);
        const returnSum = PaymentsTools.convert_some_to_CZK(sum, from_currency);

        expect(returnSum).toBe(expectedReturnSum);
    });

    it('should return 0 if from_currency is not in the list_of_currencies', () => {
        jest.spyOn(PaymentsTools, 'read_cnb_file').mockReturnValue([]);
        const sum = 100;
        const from_currency = 'GBP';

        const expectedReturnSum = 0;
        const returnSum = PaymentsTools.convert_some_to_CZK(sum, from_currency);

        expect(returnSum).toEqual(expectedReturnSum);
    });
});
});

describe('PaymentsTools.convert_currency_manager', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return the same sum when from_currency and to_currency are equal', () => {
        const sum = 100;
        const from_currency = 'USD';
        const to_currency = 'USD';

        const result = PaymentsTools.convert_currency_manager(sum, from_currency, to_currency);

        expect(result).toBe(sum);
    });

    test('should call PaymentsTools.convert_CZK_to_some when from_currency is CZK and to_currency is different', () => {
        const sum = 100;
        const from_currency = 'CZK';
        const to_currency = 'USD';
        const converted_sum = 5;

        jest.spyOn(PaymentsTools, 'convert_CZK_to_some').mockReturnValue(converted_sum);

        const result = PaymentsTools.convert_currency_manager(sum, from_currency, to_currency);

        expect(PaymentsTools.convert_CZK_to_some).toHaveBeenCalledWith(sum, to_currency);
        expect(result).toBe(converted_sum);
    });

    test('should call PaymentsTools.convert_some_to_CZK when to_currency is CZK and from_currency is different', () => {
        const sum = 100;
        const from_currency = 'USD';
        const to_currency = 'CZK';
        const converted_sum = 2000;

        jest.spyOn(PaymentsTools, 'convert_some_to_CZK').mockReturnValue(converted_sum);

        const result = PaymentsTools.convert_currency_manager(sum, from_currency, to_currency);

        expect(PaymentsTools.convert_some_to_CZK).toHaveBeenCalledWith(sum, from_currency);
        expect(result).toBe(converted_sum);
    });

    test('should call PaymentsTools.convert_CZK_to_some and PaymentsTools.convert_some_to_CZK when from_currency and to_currency are different', () => {
        const sum = 100;
        const from_currency = 'USD';
        const to_currency = 'EUR';
        const converted_sum1 = 80;
        const converted_sum2 = 70;

        jest.spyOn(PaymentsTools, 'convert_some_to_CZK').mockReturnValue(converted_sum1);
        jest.spyOn(PaymentsTools, 'convert_CZK_to_some').mockReturnValue(converted_sum2);

        const result = PaymentsTools.convert_currency_manager(sum, from_currency, to_currency);

        expect(PaymentsTools.convert_some_to_CZK).toHaveBeenCalledWith(sum, from_currency);
        expect(PaymentsTools.convert_CZK_to_some).toHaveBeenCalledWith(converted_sum1, to_currency);
        expect(result).toBe(converted_sum2);
    });

});


describe('payment_for_same_client', () => {
    let client;
    let pay_content;

    beforeEach(() => {
        // připravíme data pro každý test
        client = {
            _id: 123,
            accounts: [
                { account_number: 123, balance: 1000, currency: 'CZK' },
                { account_number: 456, balance: 200, currency: 'CZK' }
            ],
            payments: []
        };
        pay_content = {
            from_account: 123,
            to_account: 456,
            money: '500',
            currency: 'CZK'
        };
    });

    it('should decrease balance of from_account and increase balance of to_account', () => {
        const expectedClient = {
            _id: 123,
            accounts: [
                { account_number: 123, balance: 500, currency: 'CZK' },
                { account_number: 456, balance: 700, currency: 'CZK' }
            ],
            payments: [pay_content]
        };

        const result = PaymentsTools.payment_for_same_client(pay_content, client);

        expect(result).toEqual(expectedClient);
    });

    it('should not modify client if from_account is not found', () => {
        pay_content.from_account = 999;
        const expectedClient = {
            _id: 123,
            accounts: [
                { account_number: 123, balance: 1000, currency: 'CZK' },
                { account_number: 456, balance: 200, currency: 'CZK' }
            ],
            payments: []
        };

        const result = PaymentsTools.payment_for_same_client(pay_content, expectedClient);

        expect(result).toEqual(expectedClient);
    });

    it('should not modify client if to_account is not found', () => {
        pay_content.to_account = 999;
        const expectedClient = {
            _id: 123,
            accounts: [
                { account_number: 123, balance: 1000, currency: 'CZK' },
                { account_number: 456, balance: 200, currency: 'CZK' }
            ],
            payments: []
        };

        const result = PaymentsTools.payment_for_same_client(pay_content, expectedClient);

        expect(result).toEqual(expectedClient);
    });

});


describe('PaymentsTools.payment_for_another_client', () => {
    const pay_content = {
        from_account: '111111',
        to_account: '222222',
        money: '1000',
        currency: 'CZK',
    };

    const pay_content2 = {
        from_account: '777777',
        to_account: '666666',
        money: '1000',
        currency: 'CZK',
    };

    const all_clients = [
        {
            _id: '1',
            accounts: [
                {
                    account_number: 111111,
                    balance: 5000,
                    currency: 'CZK',
                },
                {
                    account_number: 111112,
                    balance: 10000,
                    currency: 'CZK',
                },
            ],
            payments: [],
        },
        {
            _id: '2',
            accounts: [
                {
                    account_number: 222221,
                    balance: 2000,
                    currency: 'CZK',
                },
                {
                    account_number: 222222,
                    balance: 500,
                    currency: 'CZK',
                },
            ],
            payments: [],
        },
    ];

    it('should update the balance of the target account', () => {
        const client_change = PaymentsTools.payment_for_another_client(pay_content, all_clients);
        expect(client_change.accounts[1].balance).toBe(1500);
    });


    it('should add the payment to the target client', () => {
        const client_change = PaymentsTools.payment_for_another_client(pay_content, all_clients);
        expect(client_change.payments).toHaveLength(2);
        expect(client_change.payments[0]).toEqual(pay_content);
    });

    it('should not update the balance of other accounts', () => {
        PaymentsTools.payment_for_another_client(pay_content2, all_clients);
        expect(all_clients[0].accounts[1].balance).toBe(10000);
        expect(all_clients[1].accounts[0].balance).toBe(2000);
        expect(all_clients[1].accounts[1].balance).toBe(2500);
    });

    it('should return the updated client', () => {
        const client_change = PaymentsTools.payment_for_another_client(pay_content, all_clients);
        expect(client_change).toBeDefined();
        expect(client_change).toHaveProperty('_id');
        expect(client_change._id).toBe('2');
        expect(client_change).toHaveProperty('accounts');
        expect(client_change.accounts).toHaveLength(2);
        expect(client_change).toHaveProperty('payments');
        expect(client_change.payments).toHaveLength(3);
    });

    it('should return null if the target account is not found', () => {
        const invalid_pay_content = { ...pay_content, to_account: '1111111111' };
        const client_change = PaymentsTools.payment_for_another_client(invalid_pay_content, all_clients);
        expect(client_change).toBeNull();
    });
});

describe('PaymentsTools.deposit_money_part', () => {
    it('should update the balance of the specified account in the client object', () => {
        const money = 50;
        const account_number = '123456789';
        const client = {
            name: 'John Doe',
            accounts: [
                {
                    account_number: '123456789',
                    balance: 100
                },
                {
                    account_number: '987654321',
                    balance: 500
                }
            ]
        };
        const updatedClient = PaymentsTools.deposit_money_part(money, account_number, client);
        expect(updatedClient.accounts[0].balance).toBe(150);
        expect(updatedClient.accounts[1].balance).toBe(500);
    });
});

describe("generate_number", () => {
    it("should return a number", () => {
        const result = PaymentsTools.generate_number();
        expect(typeof result).toBe("number");
    });

    it("should return a 6-digit number", () => {
        const result = PaymentsTools.generate_number();
        expect(result.toString().length).toBe(6);
    });

    it("should return a different number each time it's called", () => {
        const results = new Set();
        for (let i = 1; i <= 1000; i++) {
            results.add(PaymentsTools.generate_number());
        }
        expect(results.size).not.toBe(50);
    });
});


describe('deposit_money', () => {
    it('should deposit money to account and update client data', async () => {
        // Vytvoření klienta a účtu
        const client = {
            name: 'John Doe',
            accounts: [
                {
                    account_number: 654321,
                    currency: "CZK",
                    balance: 500,
                }
            ],
        };

        // Naplnění účtu penězi

        // Zavolání testované metody
        await PaymentsTools.deposit_money(0, client.accounts.account_number, client);
        await PaymentsTools.put_client(client, true);

        // Ověření, že se výsledek shoduje s očekáváním
        expect(client.accounts[0].balance).toBe(500);

        // Uložení klienta (může být třeba upravit podle konkrétní implementace)

    });
});
/*
describe('PaymentsTools.add_new_account_all', () => {
    // mockované vstupní data
    const actual_client = {
        id: 1,
        name: 'John Doe',
        accounts: [
            { currency: 'USD', balance: 100 },
            { currency: 'EUR', balance: 50 },
        ],
        payments: []
    };
    const currency = 'GBP';

    // definice spy a mocků
    let addNewAccountPartSpy;
    let loadAllClientsMock;
    let saveClientsSpy;

    beforeEach(() => {
        // vytvoření spy na metodu add_new_account_part
        addNewAccountPartSpy = jest.spyOn(PaymentsTools, 'add_new_account_part').mockImplementation((client, newAccount) => {
            // když je tato metoda volána, vrátí vylepšený klient s novým účtem
            return {
                ...client,
                accounts: [...client.accounts, newAccount],
            };
        });

        // vytvoření mocku na metodu load_all_clients
        loadAllClientsMock = jest.spyOn(PaymentsTools, 'load_all_clients').mockResolvedValueOnce([]);

        // vytvoření spy na metodu save_clients
        saveClientsSpy = jest.spyOn(PaymentsTools, 'save_clients').mockResolvedValueOnce();
    });

    afterEach(() => {
        // obnovení spy a mocků po každém testu
        jest.restoreAllMocks();
    });

    // samotné testování
    it('should add a new account to the client and save it', async () => {
        // zavolání testované metody
        await PaymentsTools.add_new_account_all(actual_client, currency);

        // ověření, že metoda add_new_account_part byla volána s očekávanými parametry
        expect(addNewAccountPartSpy).toHaveBeenCalledWith(actual_client, { currency, balance: 0 }, []);

        // ověření, že metoda load_all_clients byla volána
        expect(loadAllClientsMock).toHaveBeenCalled();

        // ověření, že metoda save_clients byla volána s očekávanými parametry
        expect(saveClientsSpy).toHaveBeenCalledWith([{
            ...actual_client,
            accounts: [...actual_client.accounts, { currency, balance: 0 }],
        }]);
    });
});
*/



