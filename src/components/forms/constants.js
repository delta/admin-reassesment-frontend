export const departmentList = ['Architecture', 'Chemical Engineering', 'Civil Engineering', 'Computer Science and Engineering', 'Electrical and Electronics Engineering', 'Electronics and Communication Engineering', 'Instrumentation and Control Engineering', 'Mechanical Engineering', 'Metallurgical and Materials Engineering', 'Production Engineering'];
export const statusList = ['Passing Out', 'Passed Out']
export const degreeList = ['M.Tech', 'M.Arch', 'M.Sc', 'MBA', 'MCA'];
export const masterSemesterOptions = {
    'M.Tech': 4,
    'M.Arch': 4,
    'M.Sc': 4,
    'MCA': 6,
    'MBA': 6
};
const startBatch = 2011;
const endBatch = 2016;

export let ugBatchOptions = [];
for (let i = startBatch; i <= endBatch; ++i) ugBatchOptions.push(i);

export const masterBatchOptions = ["Admitted in 2015 - 2016", "2017 and after"]

export let semesterOptions = [];
for (let i = 1; i <= 10; ++i) semesterOptions.push(i);

export const specialisations = {
    'M.Tech': [
        'Energy Engineering', 'Chemical Engineering', 'Process Control and Instrumentation', 'Industial Automation',
        'Transportation Engineering and Management', 'Construction Technology and Management', 'Structural Engineering',
        'Environmental Engineering', 'Computer Science and Engineering', 'Power Electronics', 'Power Systems',
        'Communication Systems', 'VLSI System', 'Industrial Safety Engineering', 'Thermal Power Engineering',
        'Material science and Engineering', 'Industrial metallurgy', 'Welding Engineering',
        'Industrial Engineering and Management', 'Manufacturing Technology', 'Non-Destructive Testing',
        'Data Analytics'
    ],
    'M.Arch': [
        'Energy Efficient and Sustainable Architecture'
    ],
    'M.Sc': [
        'Computer Science', 'Chemistry', 'Physics', 'Mathematics'
    ],
    'MCA': [], 'MBA': []
}