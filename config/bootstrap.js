/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://links.sailsjs.org/docs/config/bootstrap
 */

module.exports.bootstrap = function(cb) {

  // Create users
  User.create(
    [
      {//0
        email: 'person1@example.com',
        password: 'pass'
      },
      {//1
        email: 'person2@example.com',
        password: 'pass'
      },
      {//2
        email: 'designer1@example.com',
        password: 'pass'
      },
      {//3
        email: 'designer2@example.com',
        password: 'pass'
      },
      {//4
        email: 'manager1@example.com',
        password: 'pass'
      },
      {//5
        email: 'business1@example.com',
        password: 'pass'
      }
    ]
  ).exec(function(err, users) {
      if(err){
        console.log(err);
        return;
      }
      Person.create(
        [
          {
            firstName: 'Test',
            lastName: 'Person1',
            gender: 'M',
            birthDate: '1989-11-01',
            birthPlace: 'Bari',
            birthDistrict: 'BA',
            place: 'Bari',
            district: 'BA',
            fiscalCode: 'aaaaaaaaaaaaaaaa',
            userCredentials: users[0].id
          },
          {
            firstName: 'Test',
            lastName: 'Person2',
            gender: 'M',
            birthDate: '1989-11-01',
            birthPlace: 'Bari',
            birthDistrict: 'BA',
            place: 'Bari',
            district: 'BA',
            fiscalCode: 'aaaaaaaaaaaaaaaa',
            userCredentials: users[1].id
          }
        ]
      ).exec(function(err, persons) {
          if(!err)
            console.log('Persons created', persons);
          else
            console.log(err);
        });
      Designer.create(
        [
          {
            firstName: 'Test',
            lastName: 'Designer1',
            gender: 'M',
            birthDate: '1989-11-01',
            birthPlace: 'Bari',
            birthDistrict: 'BA',
            place: 'Bari',
            district: 'BA',
            fiscalCode: 'aaaaaaaaaaaaaaaa',
            userCredentials: users[2].id
          },
          {
            firstName: 'Test',
            lastName: 'Designer2',
            gender: 'M',
            birthDate: '1989-11-01',
            birthPlace: 'Bari',
            birthDistrict: 'BA',
            place: 'Bari',
            district: 'BA',
            fiscalCode: 'aaaaaaaaaaaaaaaa',
            userCredentials: users[3].id
          },
          {
            firstName: 'Test',
            lastName: 'Manager1',
            gender: 'M',
            birthDate: '1989-11-01',
            birthPlace: 'Bari',
            birthDistrict: 'BA',
            place: 'Bari',
            district: 'BA',
            fiscalCode: 'aaaaaaaaaaaaaaaa',
            userCredentials: users[4].id
          },
        ]
      ).exec(function(err, designers) {
          if(err) {
            console.log(err);
            return;
          }
          console.log('Created designers', designers);
          Organization.create(
            [
              {
                name: 'Org1',
                address: 'Via delle Fresche Frasche',
                municipality: 'Bari',
                district: 'BA',
                vat: 'aaaaaa',
                owner: designers[0].id
              }
            ]
          ).exec(function(err, orgs) {
              if(err) {
                console.log(err);
                return;
              }
              orgs[0].collaborators.add(designers[0].id);
              orgs[0].collaborators.add(designers[1].id);
              orgs[0].save(function(err) {
                if(err) {
                  console.log(err);
                  return;
                }
                console.log('Created Organization', orgs);
              });
            });
          PublicAdmin.create(
            [
              {
                name: 'PA1',
                district: 'BA',
                manager: designers[2].id
              }
            ]
          ).exec(function(err, pas) {
              if(err) {
                console.log(err);
                return;
              }
              console.log('Created PublicAdmin', pas);
            });
        });
      Business.create(
        [
          {
            name: 'Business1',
            refFirstName: 'Nome',
            refLastName: 'Cognome',
            address: 'Piazza del Pioppi, 12',
            municipality: 'Roma',
            district: 'Roma',
            vat: 'aaaaaa',
            userCredentials: users[5].id
          }
        ]
      ).exec(function(err, business) {
          if(err) {
            console.log(err);
            return;
          }
          console.log('Business created', business);
        });
    });
  // It's very important to trigger this callack method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
