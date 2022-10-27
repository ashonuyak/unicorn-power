# Test assignment Unicorn Power

## Dependencies

Run below code:
```
npm install
```

## Usage

### Backend

Migrations are already done, and data is stored in ElephantSQL.
***Run below commands***

```
npm run start:dev
```

I implemented access and refresh token authentication. I store them in database as pairs in order to make them secure. When user uses refresh token, I delete the pair of tokens from DB, so that when malicious user tries to get a new pair of tokens with the help of the already deleted refresh token, the access for this user gets blocked.
