from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Enum, ForeignKey
from datetime import datetime
import enum
db = SQLAlchemy()

class Publishertype(enum.Enum):
    university = "Universidad/Instituto"
    academy = "Academia"
    company = "Compania"
    independent = "Independiente"
    other = "Otro"

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique = True, nullable = False)
    email = db.Column(db.String(220), unique=True, nullable=False)
    password = db.Column(db.String(280), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    publisherMode = db.Column(db.Boolean(), unique=False, nullable=False)
    publisherType = db.Column("publishertype",Enum(Publishertype), unique=False, nullable=False)
    post = db.relationship("Post", backref="user", lazy=True)
    favorites = db.relationship("Favorites", backref="user", lazy = True)

    
    
     
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):

        posts = []
        favorites = []

        for item in self.post:
            posts.append(item.id)

        for item in self.favorites:
            favorites.append(item.id)

        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "is_active": self.is_active,
            "publisherMode": self.publisherMode,
            "post": posts,
            "favorites": favorites,
            "publisherType": self.publisherType.value
            
            
            
        }

class Post(db.Model):
   

    id = db.Column(db.Integer, primary_key = True)

    user_id = db.Column(db.Integer, ForeignKey("user.id"), nullable=False)
    name = db.Column(db.String(200), unique=False, nullable=False)
    detail = db.Column(db.String(3000), unique=False, nullable=False)
    categories = db.Column(db.String(200), ForeignKey("categories.name"), nullable=False)
    event= db.Column(db.Boolean(), unique=False, nullable=False)
    alwaysAvailable = db.Column(db.Boolean(), unique=False, nullable=False)
    location = db.Column(db.String(500), unique=False, nullable=True)
    online = db.Column(db.Boolean(), unique=False, nullable=False)
    date = db.Column(db.DateTime(timezone=True), unique=False, nullable=True)
    duration= db.Column(db.String(200), unique=False, nullable=False)
    certificate= db.Column(db.Boolean(), unique=False, nullable=False)
    creationDate = db.Column(db.DateTime(timezone=True), server_default=str(datetime.now()))
    favorites = db.relationship("Favorites", backref="post", lazy = True)

    def __repr__(self):
        return f'<Post {self.name}>'

    def serialize(self):
        return{
            "author": self.user_id,
            "name": self.name,
            "detail":self.detail,
            "id":self.id,
            "categories":self.categories,
            "alwaysAvailable":self.alwaysAvailable,
            "location": self.location,
            "online": self.online,
            "date": self.date,
            "duration": self.duration,
            "certificate": self.certificate 
            }

class Categories(db.Model):
    __tablename__ ="categories"
    id = db.Column(db.Integer, primary_key=True)
    post = db.relationship("Post", backref="categories_post", lazy=True)
    name = db.Column(db.String(200), unique=True, nullable=False)

    def serialize(self):
        return{
            "post": self.post,
            "name": self.name
        }
    
    def __repr__(self):
        return f'<Categories {self.name} >'


class Favorites(db.Model):
    __tablename__ = "favorites"
    id = db.Column(db.Integer, primary_key= True)
    user_id = db.Column(db.Integer, ForeignKey("user.id"))
    post_id = db.Column(db.Integer, ForeignKey("post.id"))

    def __repr__(self):
        return f'<favorites {self.id}>'
    
    def serialize(self):
        return{
            "post_id": self.post_id,
           
            }

