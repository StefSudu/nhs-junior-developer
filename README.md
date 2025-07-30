# NHS-Junior-Developer

# Instructions to setup project locally
1. Run npm install
2. Create .env.local file and add the JWT_SECRET (provided over email)
3. Copy credentials.json into the database folder
3. Please verify 'client_id' and 'client_secret' are included on the 'Generate token' request in postman (I will provide the creds over email as well)
4. Run 'npm run dev'
5. Send requests through postman
    -> Send 'generate token' request
    -> Send 'search' request with desired inputs and bearer token for authorisation

# Search request inputs
- Techonology: [Cloud Computing, Cybersecurity, DevOps]
- Role: [System Administrator, Software Engineer, Security Analyst, Security Analyst]
- Environment: [Cloud Infrastructure, On-Prem Data Center, Enterprise Network]

# App features
1. Search with a number of different inputs and receive a random scenario based on the input
2. Authentication & Authorisation
