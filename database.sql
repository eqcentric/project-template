create table if not exists assets
(
    id     bigint unsigned not null invisible
        primary key,
    device_id     varchar(255)    null,
    asset_key     varchar(255)    null,
    connection_id int             null
);

create table if not exists connections
(
    id         int             null     primary key,
    name       varchar(255)    null,
    provider   varchar(255)    null,
    api_token  text            null,
    email      varchar(255)    null,
    enabled    tinyint         null,
    updated_at timestamp       null
);

create table if not exists users
(
    id         int             null   primary key,
    username   varchar(255)    null,
    password   text            null,
    updated_at timestamp       null
);

