mongo -- "$MONGO_DB" <<EOF
var user = '$MONGO_USERNAME';
var passwd = '$MONGO_PASSWORD';
var admin = db.getSiblingDB('admin');
admin.auth(user, passwd);
use streamloots-test
db.createUser({
 user: user, 
 pwd: passwd, 
 roles: [ 
    { role: "readWrite", db: "streamloots-test" },
    ]
                           
});
use streamloots-dev
db.createUser({
 user: user, 
 pwd: passwd, 
 roles: [ 
    { role: "readWrite", db: "streamloots-dev" },
    ]
                           
});
 
EOF

