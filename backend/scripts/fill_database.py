from tasks.models import Section, Task

class DataImport:

    def delete_data(self):
        from tasks.models import Section, Task

        # loop through all Sections
        # deleting the Section will delete the corresponding Task, which deletes the corresponding Notes
        sections = Section.objects.all()
        for section in sections:
            section.delete()        

    def main(self):
        from tasks.models import Section, Task
        import random
        from faker import Faker
        from datetime import date

        fake = Faker(['en_US'])

        section_names = ["Research", "Development", "Completed", "Needs Approval"]
        
        self.delete_data()

        num_of_sections = random.randint(1, len(section_names))
        for x in range(num_of_sections):
            section_name = random.choice(section_names)
            # remove so we don't get duplicates
            section_names.remove(section_name)
            section = Section(name=section_name, color=fake.hex_color())
            section.save()

            task_names = ["Create document", "Fix bug", "deploy server", "Change config file"]
            # create tasks
            num_of_tasks = random.randint(1, len(task_names))
            for x in range(num_of_tasks):
                name = random.choice(task_names)
                task_names.remove(name)
                start_date = date.today()
                end_date = date(start_date.year+1, start_date.month, start_date.day)
                due_date = fake.date_between_dates(date_start=start_date, date_end=end_date).strftime('%Y-%m-%d')
                task = Task(section_id=section.id, name=name, due=due_date)
                task.save()

data_import = DataImport()
data_import.main()



