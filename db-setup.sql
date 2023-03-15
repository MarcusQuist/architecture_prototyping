CREATE TABLE IF NOT EXISTS Chatroom (
    id int GENERATED ALWAYS AS IDENTITY,
    name varchar(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Message (
    id int GENERATED ALWAYS AS IDENTITY,
    chatroom_id int NOT NULL,
    text Text NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(chatroom_id) REFERENCES chatroom(id)
);


INSERT INTO public.chatroom(name) VALUES ('test1');
INSERT INTO public.chatroom(name) VALUES ('test2');
INSERT INTO public.chatroom(name) VALUES ('test3');
INSERT INTO public.chatroom(name) VALUES ('test4');
INSERT INTO public.chatroom(name) VALUES ('test5');
INSERT INTO public.chatroom(name) VALUES ('test6');
INSERT INTO public.chatroom(name) VALUES ('test7');
INSERT INTO public.chatroom(name) VALUES ('test8');
INSERT INTO public.chatroom(name) VALUES ('test9');
INSERT INTO public.chatroom(name) VALUES ('test10');
