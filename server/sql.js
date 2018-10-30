module.exports = {
  getPersons: `
select emails.id, FirstName, LastName, Patronymic, Address, Email, Phone, Post, Subdivision from (
    select person.id, string_agg(sEmail, ',') as Email
    from person inner join email on person.id = email.idPerson
    group by person.id
) as emails
inner join (
    select person.id, string_agg(sPhoneNumber, ',') as Phone
    from person inner join phonenumber on person.id = phonenumber.idPerson
    group by person.id
) as phones on emails.id = phones.id
inner join (
    select person.id, sFirstName as FirstName, sSecondName as LastName, 
        sPatronymic as Patronymic, sAddress as Address, 
        string_agg(post.sName, ',') as Post, string_agg(subdivision.sName, ',') as Subdivision 
    from unit 
    inner join subdivision on unit.idSubdivision = subdivision.id
    inner join post on unit.idPosition = post.id
    inner join person on unit.idperson = person.id
    group by person.id
) as personinfo on emails.id = personinfo.id
where 
    concat_ws(' ', FirstName, LastName, Patronymic) ~ $1
    and Phone ~ $2 
    and Email ~ $3
    and Subdivision ~ $4
    and Post ~ $5
    and Address ~$6
`,
    getPositions: `
select sName as PositionName from post order by sName;

    `

}