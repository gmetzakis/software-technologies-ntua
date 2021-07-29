const expect = require('chai').expect
const cmd = require('./cmd_test')
const { EOL } = require('os')

describe('Error at login No.1 -> Parameter --passw isnt properly described', () => {
  it('You have to set parameter --passw', async () => {
    try {
      await cmd.execute('index.js', ['login', '--username', 'admin', '--password', 'petrol4ever']);
    } catch(err) {
      expect(err.trim()).to.equal(
        'You have to set parameter --passw'
      );
    }
  });
});

describe('Error at login No.2 -> Parameter --username isnt properly described', () => {
  it('You have to set parameter --username', async () => {
    try {
      await cmd.execute('index.js', ['login', '--username1', 'admin', '--passw', 'petrol4ever']);
    } catch(err) {
      expect(err.trim()).to.equal(
        'You have to set parameter --username using at least one letter'
      );
    }
  });
});

describe('Error at login No.3 -> Extra arguments are given', () => {
  it('You used extra arguments. In order to log in follow the syntax shown below:', async () => {
    try {
      await cmd.execute('index.js', ['login', '--username', 'admin', '--passw', 'petrol4ever', '123']);
    } catch(err) {
      expect(err.trim()).to.equal(
        'You used extra arguments. In order to log in follow the syntax shown below:',
        'login --username Username --passw Password'
      );
    }
  });
});

describe('Error at login No.4 -> User doesnt exist', () => {
  it('Error 404. Invalid username given', async () => {
    try {
      await cmd.execute('index.js', ['login', '--username', 'test', '--passw', 'qfd']);
    } catch(err) {
      expect(err.trim()).to.equal(
        'Error 404',
        'Invalid username given!'
      );
    }
  });
});

describe('Error at login No.5 -> Invalid password', () => {
  it('Error 403. The password is invalid!', async () => {
    try {
      await cmd.execute('index.js', ['login', '--username', 'admin', '--passw', 'qfd']);
    } catch(err) {
      expect(err.trim()).to.equal(
        'Error 403',
        'The password is invalid!'
      );
    }
  });
});

describe('Error at logout No.1 -> Extra arguments are given', () => {
  it('In order to logout just type logout', async () => {
    try {
      await cmd.execute('index.js', ['logout', '123']);
    } catch(err) {
      expect(err.trim()).to.equal(
        'In order to logout just type logout'
      );
    }
  });
});

describe('Error at logout No.2 -> You need to login first', () => {
  it('You need to log in first', async () => {
    try {
      await cmd.execute('index.js', ['logout']);
    } catch(err) {
      expect(err.trim()).to.equal(
        'You need to log in first'
      );
    }
  });
});


describe('Login Passed', () => {
    it('User admin succesfully logged in !', async () => {
      const response = await cmd.execute(
        'index.js',
        ['login', '--username', 'admin', '--passw', 'petrol4ever']
      );
      expect(response.trim().split('\n')[0]).to.equal(
        'User admin succesfully logged in !')
    });
  });

describe('Logout Passed', () => {
  it('User admin succesfully logged out !', async () => {
    const response = await cmd.execute(
      'index.js',
      ['logout']
    );
    expect(response.trim()).to.equal(
      'Status 200\n{ success: true, message: \'OK\' }')
  });
});

describe('Error at SessionsPer... No.1 -> You need to login first', () => {
  it('You need to log in first', async () => {
    try {
      await cmd.execute('index.js', ['SessionsPerEV', '--ev', '3', '--datefrom', '20201001', '--dateto', '20201030']);
    } catch(err) {
      expect(err.trim()).to.equal(
        'You need to log in first'
      );
    }
  });
});

describe('Login Passed', () => {
  it('User admin succesfully logged in !', async () => {
    const response = await cmd.execute(
      'index.js',
      ['login', '--username', 'admin', '--passw', 'petrol4ever']
    );
    expect(response.trim().split('\n')[0]).to.equal(
      'User admin succesfully logged in !')
  });
});

describe('Error at SessionsPer... No.2 -> You have to set parameter --ev using a number', () => {
  it('You have to set parameter --ev using a number', async () => {
    try {
      await cmd.execute('index.js', ['SessionsPerEV', '--ev', 'g', '--datefrom', '20201001', '--dateto', '20201030']);
    } catch(err) {
      expect(err.trim()).to.equal(
        'You have to set parameter --ev using a number'
      );
    }
  });
});

describe('Error at SessionsPer... No.3 -> You have to set parameter --datefrom using 8 numbers', () => {
  it('You have to set parameter --datefrom using 8 numbers', async () => {
    try {
      await cmd.execute('index.js', ['SessionsPerEV', '--ev', '3', '--datefrom2', '20201001', '--dateto', '20201030']);
    } catch(err) {
      expect(err.trim()).to.equal(
        'You have to set parameter --datefrom using 8 numbers'
      );
    }
  });
});

describe('Error at SessionsPer... No.4 -> You have to set parameter --dateto using 8 numbers', () => {
  it('You have to set parameter --dateto using 8 numbers', async () => {
    try {
      await cmd.execute('index.js', ['SessionsPerEV', '--ev', '3', '--datefrom', '20201001', '--dateto2', '20201030']);
    } catch(err) {
      expect(err.trim()).to.equal(
        'You have to set parameter --dateto using 8 numbers'
      );
    }
  });
});

describe('Error at SessionsPer... No.5 -> There are no data with these parameters', () => {
  it('There are no data with these parameters', async () => {
    try {
      await cmd.execute('index.js', ['SessionsPerEV', '--ev', '3', '--datefrom', '20201001', '--dateto', '20201030']);
    } catch(err) {
      expect(err.trim()).to.equal(
        'Error 402',
        'There are no data with these parameters'
      );
    }
  });
});

describe('Error at SessionsPer... No.6 -> You used more parameters than needed', () => {
  it('You used more parameters than needed', async () => {
    try {
      await cmd.execute('index.js', ['SessionsPerEV', '--ev', '3', '--datefrom', '20201001', '--dateto', '20201030', '--123']);
    } catch(err) {
      expect(err.trim()).to.equal(
        'You used more parameters then needed. Follow the syntax as shown below:',
        'SessionsPerEV --ev ID --datefrom Date --dateto Date --format Format',
        '*You can skip parameter --format. By default json format is selected'
      );
    }
  });
});

describe('Error at usermod No.1 -> You used more parameters than needed', () => {
  it('The correct syntax for --usermod is as shown below:', async () => {
    try {
      await cmd.execute('index.js', ['Admin', '--usermod', '--username', 'q13', '--passw', 'fq', '--123']);
    } catch(err) {
      expect(err.trim()).to.equal(
        'The correct syntax for --usermod is as shown below:',
        '--usermod --username Username --passw Password'
      );
    }
  });
});

describe('Error at usermod No.2 -> You need to set parameter --passw', () => {
  it('You need to set parameter --passw', async () => {
    try {
      await cmd.execute('index.js', ['Admin', '--usermod', '--username', 'q13', '--pas123sw', 'fq']);
    } catch(err) {
      expect(err.trim()).to.equal(
        'You have to set parameter --passw'
      );
    }
  });
});

describe('User test_case345 created', () => {
  it('Welcome to the platform user test_case345 !', async () => {
    var response = await cmd.execute(
      'index.js',
      ['Admin', '--usermod', '--username', 'test_case345', '--passw', 'qwer']
    );
    expect(response.trim().split('\n')[0]).to.equal(
      'Welcome to the platform user test_case345 !')
  });
});

describe('Users test_case345 password has been updated', () => {
  it('Password has been successfully updated!', async () => {
    var response = await cmd.execute(
      'index.js',
      ['Admin', '--usermod', '--username', 'test_case345', '--passw', 'qwer11']
    );
    expect(response.trim().split('\n')[0]).to.equal(
      'Password has been successfully updated!')
  });
});

describe('User test_case345 status', () => {
  it('User test_case345 status', async () => {
    var response = await cmd.execute(
      'index.js',
      ['Admin', '--users', 'test_case345']
    );
    expect(response.trim().split('\n')[0]).to.equal(
      '{ Username: \'test_case345\', Admn: 0 }')
  });
});

describe('Error at users No.1 -> Username is not in database', () => {
  it('Username is not in database', async () => {
    try {
      await cmd.execute('index.js', ['Admin', '--users', '--username', 'q131413']);
    } catch(err) {
      expect(err.trim()).to.equal(
        'Username is not in database'
      );
    }
  });
});

describe('Logout Passed', () => {
  it('User admin succesfully logged out !', async () => {
    const response = await cmd.execute(
      'index.js',
      ['logout']
    );
    expect(response.trim()).to.equal(
      'Status 200\n{ success: true, message: \'OK\' }')
  });
});

describe('Login Passed as test_case345', () => {
  it('User test_case345 succesfully logged in !', async () => {
    const response = await cmd.execute(
      'index.js',
      ['login', '--username', 'test_case345', '--passw', 'qwer11']
    );
    expect(response.trim().split('\n')[0]).to.equal(
      'User test_case345 succesfully logged in !')
  });
});

describe('Error at users No.2 -> User has no permission for this action', () => {
  it('User has no permission for this action', async () => {
    try {
      await cmd.execute('index.js', ['Admin', '--users', '--username', 'q131413']);
    } catch(err) {
      expect(err.trim()).to.equal(
        'Error 401',
        'User has no permission for this action!'
      );
    }
  });
});

describe('Help as logged in user', () => {
  it('Help as logged in user', async () => {
    const response = await cmd.execute(
      'index.js',
      ['help']
    );
    expect(response.trim()).to.equal(
      'Choose one of the following scopes:\nSessionsPerPoint --point --datefrom --dateto --format\nSessionsPerStation --station --datefrom --dateto --format\nSessionsPerEV --ev --datefrom --dateto --format\nSessionsPerProvider --provider --datefrom --dateto --format\nhealthcheck\nresetsessions\nlogout'
      );
  });
});

describe('Logout Passed as user test_case345', () => {
  it('User test_case345 succesfully logged out !', async () => {
    const response = await cmd.execute(
      'index.js',
      ['logout']
    );
    expect(response.trim()).to.equal(
      'Status 200\n{ success: true, message: \'OK\' }')
  });
});

describe('Help as not a logged in user', () => {
  it('Help as not a logged in user', async () => {
    const response = await cmd.execute(
      'index.js',
      ['help']
    );
    expect(response.trim()).to.equal(
      'You are not logged in!\nChoose one of the following scopes:\nlogin --username --passw\nhealthcheck\nresetsessions'
      );
  });
});