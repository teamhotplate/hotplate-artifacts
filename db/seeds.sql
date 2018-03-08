
insert into Users (username, pass, points, role) VALUES ('test', 'testPassword',2,'USER');
insert into Users (username, pass, points, role) VALUES ('admin', 'securePassword',0,'ADMIN');
insert into Users (username, pass, points, role) VALUES ('moderator', 'modPassword',100,'MOD');

insert into Pages (name, description, createdAt, updatedAt, UserId) VALUES ('Dogs Are Better Than Cats', 'I believe that dogs are a superior pet to cats. Theyre
friendlier and they play with you more.', now(), now(), 1);
insert into Pages (name, description, createdAt, updatedAt, UserId) VALUES ('CMV: The plot of "Captain America: Civil War" makes no sense, and the movie sucks as a result.', 'I do not understand why anybody likes this movie',
now(), now(), 2);

insert into Comments (text, points, reportFlg, createdAt, updatedAt, ParentId, PageId, UserId) VALUES ('I do not agree. Captain America Civil War was a great film and makes total sense',
0,0,now(),now(),null,2,1);
insert into Comments (text, points, reportFlg, createdAt, updatedAt, ParentId, PageId, UserId) VALUES ('Well you are an idiot',
0,0,now(),now(),1,2,2);
insert into Comments (text, points, reportFlg, createdAt, updatedAt, ParentId, PageId, UserId) VALUES ('Cats are way better than dogs because they are smarter',
0,0,now(),now(),null,1,2);
insert into Comments (text, points, reportFlg, createdAt, updatedAt, ParentId, PageId, UserId) VALUES ('Dogs are smarter, they have helped humanity for centuries and they can fetch small objects',
0,0,now(),now(),null,1,3);
