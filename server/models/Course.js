const mongoose = require('mongoose');
const debug = require('debug')('app:modelCourse');

const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: '{PATH} is required.'
  },
  featured: {
    type: Boolean,
    required: '{PATH} is required.'
  },
  published: {
    type: Date,
    required: '{PATH} is required.'
  },
  tags: [String]
});

const Course = mongoose.model('Course', courseSchema);
function createDefaultCourses() {
  Course
    .find({}, (err, collection) => {
      debug('Default courses set check...');
      if (collection.length === 0) {
        Course.create({
          title: 'C# for Sociopaths', featured: true, published: new Date('10/5/2020'), tags: ['C#']
        });
        Course.create({
          title: 'C# for Non-Sociopaths', featured: true, published: new Date('10/12/2020'), tags: ['C#']
        });
        Course.create({
          title: 'Super Duper Expert C#', featured: false, published: new Date('10/1/2020'), tags: ['C#']
        });
        Course.create({
          title: 'Visual Basic for Visual Basic Developers', featured: false, published: new Date('7/12/2020'), tags: ['VB']
        });
        Course.create({
          title: 'Pedantic C++', featured: true, published: new Date('1/1/2020'), tags: ['C++']
        });
        Course.create({
          title: 'JavaScript for People over 20', featured: true, published: new Date('10/13/2020'), tags: ['JS']
        });
        Course.create({
          title: 'Maintainable Code for Cowards', featured: true, published: new Date('3/1/2020'), tags: ['Coding']
        });
        Course.create({
          title: 'A Survival Guide to Code Reviews', featured: true, published: new Date('2/1/2020'), tags: ['Coding']
        });
        Course.create({
          title: 'How to Job Hunt Without Alerting your Boss', featured: true, published: new Date('10/7/2020'), tags: ['Misc']
        });
        Course.create({
          title: 'How to Keep your Soul and go into Management', featured: false, published: new Date('8/1/2020'), tags: ['Management']
        });
        Course.create({
          title: 'Telling Recruiters to Leave You Alone', featured: false, published: new Date('11/1/2020'), tags: ['Misc', 'Management', 'Sanity']
        });
        Course.create({
          title: "Writing Code that Doesn't Suck", featured: true, published: new Date('10/13/2020'), tags: ['Coding']
        });
        Course.create({
          title: 'Code Reviews for Jerks', featured: false, published: new Date('10/1/2020'), tags: ['Coding']
        });
        Course.create({
          title: 'How to Deal with Narcissistic Coworkers', featured: true, published: new Date('2/15/2020'), tags: ['Misc']
        });
        Course.create({
          title: 'Death March Coding for Fun and Profit', featured: true, published: new Date('7/1/2020'), tags: ['Coding', 'Misc']
        });
      }
    });
}

exports.createDefaultCourses = createDefaultCourses;
