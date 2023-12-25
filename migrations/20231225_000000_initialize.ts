exports.up = function (knex) {
    return knex.raw(`
    CREATE TABLE IF NOT EXISTS nostr_events (
        id varchar(64),
        pubkey varchar(64),
        created_at timestamp,
        kind int,
        tags text,
        content text,
        sig varchar(128),
        deleted boolean DEFAULT 0,
        PRIMARY KEY (id, pubkey)
    ) ENGINE=InnoDB;

    CREATE TABLE IF NOT EXISTS nostr_mentions (
        id varchar(64),
        pubkey varchar(64),
        FOREIGN KEY (id) REFERENCES nostr_events(id),
        PRIMARY KEY (id, pubkey)
    ) ENGINE=InnoDB;
    
    CREATE TABLE IF NOT EXISTS nostr_users (
        pubkey varchar(64),
        user_guid bigint,
        is_external boolean,
        PRIMARY KEY (pubkey)
    ) ENGINE=InnoDB;
    
    CREATE TABLE IF NOT EXISTS nostr_kind_1_to_activity_guid (
        id varchar(64),
        activity_guid bigint,
        owner_guid bigint,
        is_external boolean,
        PRIMARY KEY (id, activity_guid)
    ) ENGINE=InnoDB;
    
    CREATE TABLE IF NOT EXISTS nostr_pubkey_whitelist (
        pubkey varchar(64),
        PRIMARY KEY (pubkey)
    ) ENGINE=InnoDB;
    
    CREATE TABLE IF NOT EXISTS nostr_nip26_tokens (
        delegate_pubkey varchar(64),
        delegator_pubkey varchar(64),
        conditions_query_string text,
        sig varchar(128),
        PRIMARY KEY (delegate_pubkey)
    ) ENGINE=InnoDB;
    `)
  }
  
  exports.down = function (knex) {
    return knex.raw(`
        DROP TABLE IF EXISTS nostr_events;
        DROP TABLE IF EXISTS nostr_mentions;
        DROP TABLE IF EXISTS nostr_kind_1_to_activity_guid;
        DROP TABLE IF EXISTS nostr_pubkey_whitelist;
        DROP TABLE IF EXISTS nostr_nip26_tokens;
    `)
  }