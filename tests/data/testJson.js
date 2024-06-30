const { CPP, C, PYTHON, JAVA, NODEJS, RUBY, PROMPTV1, PROMPTV2, GO, RUST, PHP} = require("../../enums/supportedLanguages")

const testCases = [
    {
        name: 'cpp : hello world',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n' +
                'using namespace std;\n' +
                'int main(){\n' +
                '    cout << "hello world";\n' +
                'return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'hello world',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'cpp : print stdin',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n\n' +
                'using namespace std;\n' +
                'int main(){\n\n' +
                '    int a;\n' +
                '    while(cin >> a){\n' +
                '        cout << a << endl;\n' +
                '    }\n' +
                '    return 0;\n\n' +
                '}\n',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1\n2\n3\n',
            status: 200,
            error: 0,
        },

    },
    {
        name: 'nodejs : hello world',
        reqObject: {
            language: 'nodejs',
            script: 'console.log(\'hello world\')',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'nodejs : print stdin',
        reqObject: {
            language: 'nodejs',
            script:
                'process.stdin.setEncoding(\'utf8\'); \n ' +
                'process.stdin.on(\'data\', (input) => { \n ' +
                '  console.log(input); \n ' +
                ' \n ' +
                '}); \n ',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1 2 3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : hello world',
        reqObject: {
            language: 'python',
            script: 'print(\'hello world\')',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : print stdin',
        reqObject: {
            language: 'python',
            script:
                'try:\n' +
                '    while(True):\n' +
                '        line = input()\n' +
                '        if not line:\n' +
                '            break\n' +
                '        print(line)\n' +
                'except EOFError:\n' +
                '    pass',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1 2 3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'c : hello world',
        reqObject: {
            language: 'c',
            script:
                '#include<stdio.h>\n\n' +
                'int main(){\n\n' +
                '    printf("hello world");\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'hello world',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'c : print stdin',
        reqObject: {
            language: 'c',
            script:
                '#include <stdio.h>\n' +
                'int main() {\n' +
                '    int number;\n' +
                '    while (scanf("%d", &number) == 1) {\n' +
                '        printf("%d\\n", number);\n' +
                '    } \n' +
                '    return 0;\n' +
                '}',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1\n2\n3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'java : print stdin',
        reqObject: {
            language: 'java',
            script:
                'import java.util.Scanner;\n' +
                'public class Solution {\n' +
                '    public static void main(String[] args) {\n' +
                '        System.out.println("hello world");\n' +
                '    }\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'java : print stdin',
        reqObject: {
            language: 'java',
            script:
                'import java.util.Scanner;\n' +
                'public class Solution {\n' +
                '    public static void main(String[] args) {\n' +
                '        Scanner scanner = new Scanner(System.in);\n' +
                '        while (scanner.hasNextInt()) {\n' +
                '            int number = scanner.nextInt();\n' +
                '            System.out.println(number);\n' +
                '        } \n' +
                '        scanner.close();\n' +
                '    }\n' +
                '}\n',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1\n2\n3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'ruby : print hello world',
        reqObject: {
            language: 'ruby',
            script:
                'print "hello world"'
        },
        expectedResponse: {
            val: 'hello world',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'ruby : print stdin',
        reqObject: {
            language: 'ruby',
            script:
                'user_input = gets.chomp\n' +
                'puts user_input',
            stdin: '10\n'
        },
        expectedResponse: {
            val: '10\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'TLE test',
        reqObject: {
            language: 'nodejs',
            script: 'for(let i=0 ; ; ){i++}',
        },
        expectedResponse: {
            val: 'Time limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'MLE test',
        reqObject: {
            language: 'python',
            script: 'one_gb_data = bytearray(1000 * 1024 * 1024)',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'MLE test 2',
        reqObject: {
            language: 'python',
            script:
                'import time\n' +
                'def consume_memory(target_mb, duration_sec):\n' +
                '    float_size = 8\n' +
                '    floats_per_mb = (1024 * 1024) // float_size\n' +
                '    total_floats = target_mb * floats_per_mb\n' +
                '    iterations = int(duration_sec / 0.1)\n' +
                '    floats_per_iteration = total_floats // iterations\n' +
                '    memory_hog = []\n' +
                '    for _ in range(iterations):\n' +
                '        memory_hog.extend([0.0] * floats_per_iteration)\n' +
                '        time.sleep(0.1)\n' +
                'consume_memory(1000, 1)\n',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'MLE test 3',
        reqObject: {
            language: 'python',
            script:
                'a = [100]\n' +
                'for i in a:\n' +
                '    a.append(i)\n',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'OPEN AI test promptv1',
        reqObject: {
            language: 'promptv1',
            prompt: 'The question is what is 2 plus 2. The answer given is 4.',
        },
        expectedResponse: {
            val: {},
            status: 200,
            error: 0,
        },
    },
    {
        name: 'OPEN AI test promptv2',
        reqObject: {
            language: 'promptv2',
            prompt: 'The question is what is 2 plus 2. The answer given is 4.',
        },
        expectedResponse: {
            val: {},
            status: 200,
            error: 0,
        },
    },
    //new testcases for existing languages
    {
        name: 'cpp : empty',
        reqObject: {
            language: CPP,
            script: '',
        },
        expectedResponse: {
            val: '',
            status: 400,
            error: 1,
        },
    },
    {
        name: 'nodejs : syntax error',
        reqObject: {
            language: NODEJS,
            script: 'console.log(hello)',
        },
        exceptedResponse: {
            val: 'SyntaxError',
            status: 400,
            error: 1,
        },
    },
    {
        name: 'python : runtime error',
        reqObject: {
            language: PYTHON,
            script: 'print(2/0)',

        },
        expectedResponse: {
            val: 'Zerodivision error',
            status: 400,
            error: 1,
        },
    },
    {
        name: 'ruby : runtime error',
        reqObject: {
            language: RUBY,
            script: 'puts 2/0',
        },
        exceptedResponse: {
            val: 'zero division error',
            status: 400,
            error: 1,
        },
    },
    {
        name: 'java : syntax error',
        reqObject: {
            language: JAVA,
            script: 'public class Solution { public static void main(String[] args) { System.out.println(hello world); } }',
        },
        expectedResponse: {
            val: 'error: cannot find symbol\n',
            status: 400,
            error: 1,
        },
    },
    {
        name: 'c : syntax error',
        reqObject: {
            language: C,
            script: '#include<stdio.h>\n int main() { printf(hello world); return 0; }',
        },
        expectedResponse: {
            val: 'error: expected \')\' before \'hello\'',
            status: 400,
            error: 1,
        },
    },
    {
        name: 'nodejs : infinite loop',
        reqObject: {
            language: NODEJS,
            script: 'while(true) {}',
        },
        expectedResponse: {
            val: 'Time limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'python : large output',
        reqObject: {
            language: PYTHON,
            script: 'print("A" * 10**6)',
        },
        expectedResponse: {
            val: 'A'.repeat(10**6) + '\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'cpp : large input',
        reqObject: {
            language: CPP,
            script: '#include<bits/stdc++.h>\nusing namespace std;\nint main() {\n int a;\n while(cin >> a) {\n cout << a << endl;\n }\n return 0;\n}',
            stdin: Array(10**6).fill('1').join(' '),
        },
        expectedResponse: {
            val: Array(10**6).fill('1').join('\n') + '\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'ruby : large input',
        reqObject: {
            language: RUBY,
            script: 'while line = gets\n puts line\n end',
            stdin: Array(10**6).fill('1').join('\n'),
        },
        expectedResponse: {
            val: Array(10**6).fill('1').join('\n') + '\n',
            status: 200,
            error: 0,
        },
    },

    //testcases for newly included languages
    // {
    //     name: 'go : hello world',
    //     reqObject: {
    //         language: GO,
    //         script: 'package main\nimport "fmt"\nfunc main() {\n    fmt.Println("hello world")\n}',
    //     },
    //     expectedResponse: {
    //         val: 'hello world\n',
    //         status: 200,
    //         error: 0,
    //     },
    // },
    // {
    //     name: 'rust : hello world',
    //     reqObject: {
    //         language: RUST,
    //         script: 'fn main() {\n    println!("hello world");\n}',
    //     },
    //     expectedResponse: {
    //         val: 'hello world\n',
    //         status: 200,
    //         error: 0,
    //     },
    // },

    // {
    //     name: 'php : hello world',
    //     reqObject: {
    //         language: PHP,
    //         script: '<?php echo "hello world"; ?>',
    //     },
    //     expectedResponse: {
    //         val: 'hello world',
    //         status: 200,
    //         error: 0,
    //     },
    // },

]

module.exports = { testCases }
