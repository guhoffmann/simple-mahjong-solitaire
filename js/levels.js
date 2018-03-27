/**
 * Levels für Simple-Mahjong
 */

//---------------------------- Turtle

matchingGame.turtle= {};
matchingGame.turtle.positionX = [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    4, 5, 6, 7, 8, 9, 10, 11,
    3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    4, 5, 6, 7, 8, 9, 10, 11,
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    // 2. Schicht
    5, 6, 7, 8, 9, 10,
    5, 6, 7, 8, 9, 10,
    5, 6, 7, 8, 9, 10,
    5, 6, 7, 8, 9, 10,
    5, 6, 7, 8, 9, 10,
    5, 6, 7, 8, 9, 10,
    // 3. Schicht
    6, 7, 8, 9,
    6, 7, 8, 9,
    6, 7, 8, 9,
    6, 7, 8, 9,
    // 4. Schicht
    7, 8,
    7, 8,
    // 5. Schicht
    7.5
];

matchingGame.turtle.positionY = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    3.5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3.5, 3.5,
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    6, 6, 6, 6, 6, 6, 6, 6,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    // 2. Schicht
    1, 1, 1, 1, 1, 1,
    2, 2, 2, 2, 2, 2,
    3, 3, 3, 3, 3, 3,
    4, 4, 4, 4, 4, 4,
    5, 5, 5, 5, 5, 5,
    6, 6, 6, 6, 6, 6,
    // 3. Schicht
    2, 2, 2, 2,
    3, 3, 3, 3,
    4, 4, 4, 4,
    5, 5, 5, 5,
    // 4. Schicht
    3, 3,
    4, 4,
    // 5. Schicht
    3.5
];

matchingGame.turtle.shift = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    // 3. Schicht
    2, 2, 2, 2,
    2, 2, 2, 2,
    2, 2, 2, 2,
    2, 2, 2, 2,
    // 4. Schicht
    3, 3,
    3, 3,
    // 5. Schicht
    4
];

matchingGame.turtle.selectable = [
    true, false, false, false, false, false, false, false, false, false, false, true,
    true, false, false, false, false, false, false, true,
    true, false, false, false, false, false, false, false, false, true,
    true, false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false, false, true,
    true, false, false, false, false, false, false, false, false, true,
    true, false, false, false, false, false, false, true,
    true, false, false, false, false, false, false, false, false, false, false, true,
    true, false, false, false, false, true,
    true, false, false, false, false, true,
    true, false, false, false, false, true,
    true, false, false, false, false, true,
    true, false, false, false, false, true,
    true, false, false, false, false, true,
    // 3. Schicht
    true, false, false, true,
    true, false, false, true,
    true, false, false, true,
    true, false, false, true,
    // 4. Schicht
    false, false,
    false, false,
    // 5. Schicht
    true
];

//---------------------------- Cloud

matchingGame.cloud= {};
matchingGame.cloud.positionX = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    
    3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5,
    // 2. Schicht
    1,    3,    5,    7,    9,     11,     13,
    1,    3,    5,    7,    9,     11,     13,
    1,    3,    5,    7,    9,     11,     13,
    1,    3,    5,    7,    9,     11,     13,
    
             4, 5, 6, 7, 8, 9, 10, 11,
    // 3. Schicht
    1,    3,    5,    7,    9,     11,     13,
    1,    3,    5,    7,    9,     11,     13,
    1,    3,    5,    7,    9,     11,     13,
    1,    3,    5,    7,    9,     11,     13,
    
                      7
];

matchingGame.cloud.positionY = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    
    5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5,
    // 2. Schicht
    0,    0,    0,    0,    0,     0,     0,
    1,    1,    1,    1,    1,     1,     1,
    2,    2,    2,    2,    2,     2,     2,
    3,    3,    3,    3,    3,     3,     3,
    
     5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5,
    // 3. Schicht
    0,    0,    0,    0,    0,     0,     0,
    1,    1,    1,    1,    1,     1,     1,
    2,    2,    2,    2,    2,     2,     2,
    3,    3,    3,    3,    3,     3,     3,
    
                      5.5
];

matchingGame.cloud.shift = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    // 2. Schicht
    1,    1,    1,    1,    1,     1,     1,
    1,    1,    1,    1,    1,     1,     1,
    1,    1,    1,    1,    1,     1,     1,
    1,    1,    1,    1,    1,     1,     1,
    
     1, 1, 1, 1, 1, 1, 1, 1,
    // 3. Schicht
    2,    2,    2,    2,    2,     2,     2,
    2,    2,    2,    2,    2,     2,     2,
    2,    2,    2,    2,    2,     2,     2,
    2,    2,    2,    2,    2,     2,     2,
    
                      2
];

matchingGame.cloud.selectable = [
    false, false, false, false, false, false, false, false, false, false, false, false, false, true,
    false, false, false, false, false, false, false, false, false, false, false, false, false, true,
    false, false, false, false, false, false, false, false, false, false, false, false, false, true,
    false, false, false, false, false, false, false, false, false, false, false, false, false, true,
    true,  false, false, false, false, false, false, false, false, false, false, false, false, true,
    
    false, false, false, false, false, false, false, false, false,
    // 2. Schicht
    false,        false,        false,        false,        false,        false,        false,
    false,        false,        false,        false,        false,        false,        false,
    false,        false,        false,        false,        false,        false,        false,
    false,        false,        false,        false,        false,        false,        false,
    
     true, false, false, false, false, false, false, true,
    // 3. Schicht
    true,         true,         true,         true,         true,         true,         true,
    true,         true,         true,         true,         true,         true,         true,
    true,         true,         true,         true,         true,         true,         true,
    true,         true,         true,         true,         true,         true,         true,
    // 4. Schicht
                      true
];

//---------------------------- Four Hills

matchingGame.fourHills = {};

matchingGame.fourHills.positionX = [
       2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
          3, 4, 5, 6,    8, 9, 10, 11,
          3, 4, 5, 6, 7, 8, 9, 10, 11,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
       2.5, 3.5, 4.5,       9.5, 10.5, 11.5,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
          3, 4, 5, 6, 7, 8, 9, 10, 11,
          3, 4, 5, 6,    8, 9, 10, 11,
       2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    // 2. Schicht
        3.5, 4.5, 5.5,       8.5, 9.5, 10.5,
        3.5, 4.5, 5.5,       8.5, 9.5, 10.5,
        3.5, 4.5, 5.5,       8.5, 9.5, 10.5,
        
        3.5, 4.5, 5.5,       8.5, 9.5, 10.5,
        3.5, 4.5, 5.5,       8.5, 9.5, 10.5,
        3.5, 4.5, 5.5,       8.5, 9.5, 10.5,
    // 3. Schicht
            4, 5,               9, 10,
            4, 5,               9, 10,
            
            4, 5,               9, 10,
            4, 5,               9, 10,
    // 4. Schicht
             4.5,                9.5,
             
             4.5,                9.5
];

matchingGame.fourHills.positionY = [
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          1, 1, 1, 1,    1, 1, 1, 1,
          2, 2, 2, 2, 2, 2, 2, 2, 2,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
       4, 4, 4,       4, 4, 4,
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
          6, 6, 6, 6, 6, 6, 6, 6, 6,
          7, 7, 7, 7,    7, 7, 7, 7,
       8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    // 2. Schicht
        0.5, 0.5, 0.5,       0.5, 0.5, 0.5,
        1.5, 1.5, 1.5,       1.5, 1.5, 1.5,
        2.5, 2.5, 2.5,       2.5, 2.5, 2.5,
        
        5.5, 5.5, 5.5,       5.5, 5.5, 5.5,
        6.5, 6.5, 6.5,       6.5, 6.5, 6.5,
        7.5, 7.5, 7.5,       7.5, 7.5, 7.5,
    // 3. Schicht
            1, 1,               1, 1,
            2, 2,               2, 2,
            
            6, 6,               6, 6,
            7, 7,               7, 7,
    // 4. Schicht
             1.5,                1.5,
             
             6.5,                6.5
];

matchingGame.fourHills.shift = [
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0,    0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0,       0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0,    0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // 2. Schicht
        1, 1, 1,       1, 1, 1,
        1, 1, 1,       1, 1, 1,
        1, 1, 1,       1, 1, 1,
        
        1, 1, 1,       1, 1, 1,
        1, 1, 1,       1, 1, 1,
        1, 1, 1,       1, 1, 1,
    // 3. Schicht
            2, 2,               2, 2,
            2, 2,               2, 2,
            
            2, 2,               2, 2,
            2, 2,               2, 2,
    // 4. Schicht
             3,                3,
             
             3,                3
];

matchingGame.fourHills.selectable = [
           true, false, false, false, false, false, false, false, false, false, true,
                 false, false, false, false,        false, false, false, false,
                 false, false, false, false, false, false, false, false, false,
    true, false, false, false, false, false, false, false, false, false, false, false, true,
            true, false, true,                                  true, false, true,
    true, false, false, false, false, false, false, false, false, false, false, false, true,
                 false, false, false, false, false, false, false, false, false,
                 false, false, false, false,        false, false, false, false,
          true, false, false, false, false, false, false, false, false, false, true,
    // 2. Schicht
        false, false, false,       false, false, false,
        false, false, false,       false, false, false,
        false, false, false,       false, false, false,
        
        false, false, false,       false, false, false,
        false, false, false,       false, false, false,
        false, false, false,       false, false, false,
    // 3. Schicht
            false, false,               false, false,
            false, false,               false, false,
            
            false, false,               false, false,
            false, false,               false, false,
    // 4. Schicht
             true,                true,
             
             true,                true
];

//---------------------------- Bug

matchingGame.bug = {};

matchingGame.bug.positionX = [
             4.5, 5.5,     7.5, 8.5,  10.5, 11.5,           //6
    1, 2,         5,   6,  7,   8, 9, 10,   11, 12,         //10
       2, 3, 4,   5,   6,  7,   8, 9, 10,   11, 12, 13,     //12
          3, 4,   5,   6,  7,   8, 9, 10,   11, 12, 13, 14, //12
             4,   5,   6,  7,   8, 9, 10,   11, 12, 13, 14, //11
    1, 2,         5,   6,  7,   8, 9, 10,   11, 12, 13, 14, //12
             4.5, 5.5,     7.5, 8.5,  10.5, 11.5,           //6
       
    // 2. Schicht
             4.5,          7.5,       10.5,
    1,
       2, 3,      5,   6,  7,   8, 9, 10,   11, 12,
          3, 4,   5,   6,  7,   8, 9, 10,   11, 12, 13,
                  5,   6,  7,   8, 9, 10,   11, 12,
    1, 
             4.5,          7.5,       10.5,
             
    // 3. Schicht
    
    1,    
          3,      5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5,
          3,      5,   6,   7,   8,   9,   10,   11,
                  5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5,
    1, 
          
    // 4. Schicht
          3,
          3,      5.5, 6.5, 7.5, 8.5, 9.5, 10.5,
          
    // 5. Schicht
                       6,   7,   8,   9,   10
];

matchingGame.bug.positionY = [
              0, 0.5,     0, 0.5,  0, 0.5,                                  //6
    1.5, 2,           1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5,               //10
         3.5, 3,      2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2,       //12
              4, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3, 2.5,       //12
                      4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4, 3.5,  //11
    5.5, 5,                5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5, 4.5,  //12
              7, 6.5,       7, 6.5,  7, 6.5,                                //6
       
    // 2. Schicht
             0,          0,       0,
    1.5,
       3.5, 3,      2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5,
            4, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5,
                    4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5,
    5.5, 
             7,          7,       7,
             
    // 3. Schicht
    
    1.5,    
          3,      2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5,
          4,      3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5,
                  4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5,
    5.5, 
          
    // 4. Schicht
          3,
          4,      3.5, 3.5, 3.5, 3.5, 3.5, 3.5,
          
    // 5. Schicht
                       3.5, 3.5, 3.5, 3.5, 3.5
];

matchingGame.bug.shift = [
             0, 0,     0, 0, 0, 0,
    0, 0,         0,   0, 0, 0, 0, 0, 0, 0,
       0, 0, 0,   0,   0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
             0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0,         0,   0, 0, 0, 0, 0, 0, 0, 0, 0,
             0, 0,     0, 0, 0, 0,
       
    // 2. Schicht
             1,          1,       1,
    1,
       1, 1,      1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                  1, 1, 1, 1, 1, 1, 1, 1,
    1, 
             1,          1,       1,
             
    // 3. Schicht
    
    2,    
          2,      2, 2, 2, 2, 2, 2, 2,
          2,      2, 2, 2, 2, 2, 2, 2,
                  2, 2, 2, 2, 2, 2, 2,
    2, 
          
    // 4. Schicht
          3,
          3,      3, 3, 3, 3, 3, 3,
          
    // 5. Schicht
                       4, 4, 4, 4, 4
];

matchingGame.bug.selectable = [
             false, true,     false, true,     false, true,
    false, true,         true, false, false, false, false, false, false, false,
       false, false, false,   false,   false, false, false, false, false, false, false, false,
          false, false, false, false, false, false, false, false, false, false, false, true,
             false,   false, false, false, false, false, false, false, false, false, true,
    false, true,         true, false, false, false, false, false, false, false, false, true,
             false, true,     false, true,        false, true,
       
    // 2. Schicht
             true,          true,       true,
    false,
       true, false,      false, false, false, false, false, false, false, false,
          false, false, false, false, false, false, false, false, false, false, true,
                  false, false, false, false, false, false, false, false,
    false, 
             true,          true,       true,
             
    // 3. Schicht
    
    true,    
          false,      true, false, false, false, false, false, true,
          false,      false, false, false, false, false, false, false,
                      true, false, false, false, false, false, true,
    true, 
          
    // 4. Schicht
          true,
          true,      false, false, false, false, false, false,
          
    // 5. Schicht
                       true, false, false, false, true
];

//---------------------------- Flower

matchingGame.flower = {};

matchingGame.flower.positionX = [
    1, 2, 3,                9, 10, 11,
    1,    3, 1, 2, 3, 4, 5, 6, 7, 8, 9,     11,
    4,          8, 9, 10, 11,
    1, 2, 3, 4,          8,
             4,          8, 
    1,    3, 4, 5, 6, 7, 8, 9, 10, 11, 9,     11,
    1, 2, 3,                9, 10, 11,
    // 2. Schicht
    1, 2, 3,                9, 10, 11,
    1,    3, 1, 2, 3, 4, 5, 6, 7, 8, 9,     11,
    4,          8, 9, 10, 11,
    1, 2, 3, 4,          8,
             4,          8, 
    1,    3, 4, 5, 6, 7, 8, 9, 10, 11, 9,     11,
    1, 2, 3,                9, 10, 11,
    // 3. Schicht
    1, 2, 3,                9, 10, 11,
    1,    3, 1, 2, 3, 4,    6,    8, 9,     11,
                   9, 10, 11,
    1, 2, 3, 4,          8,                    
    1,    3, 4,    6,    8, 9, 10, 11, 9,     11,
    1, 2, 3,                9, 10, 11,
    // 4. Schicht
    1,                             11,

          3,                9,

    1,                             
                                   11,
          3,                9
];

matchingGame.flower.positionY = [
    0, 0, 0,                          0, 0, 0,
    1,    1, 2, 2, 2, 1.5, 1.5, 1.5, 1.5, 1.5, 1,    1,
    2.5,                2.5, 2, 2, 2,
    5, 5, 5, 3.5,                3.5,
             4.5,                4.5, 
    6,    6, 5.5, 5.5, 5.5, 5.5, 5.5, 5, 5, 5, 6,    6,
    7, 7, 7,                          7, 7, 7,
    // 2. Schicht
    0, 0, 0,                          0, 0, 0,
    1,    1, 2, 2, 2, 1.5, 1.5, 1.5, 1.5, 1.5, 1,    1,
    2.5,                2.5, 2, 2, 2,
    5, 5, 5, 3.5,                3.5,
             4.5,                4.5, 
    6,    6, 5.5, 5.5, 5.5, 5.5, 5.5, 5, 5, 5, 6,    6,
    7, 7, 7,                          7, 7, 7,
    // 3. Schicht
    0, 0, 0,                          0, 0, 0,
    1,    1, 2, 2, 2, 1.5,      1.5,      1.5, 1,    1,
                             2, 2, 2,
    5, 5, 5, 3.5,                3.5,                           
    6,    6, 5.5,      5.5,      5.5, 5, 5, 5, 6,    6,
    7, 7, 7,                          7, 7, 7,
    // 4. Schicht
    0,                                      0,

          2,                          2,

    5,                                      
                                      5,
          7,                          7
];

matchingGame.flower.shift = [
    0, 0, 0,                0, 0, 0,
    0,    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,    0,
    0,          0, 0, 0, 0,
    0, 0, 0, 0,          0,
             0,          0, 
    0,    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,    0,
    0, 0, 0,                0, 0, 0,
    // 2. Schicht
    1, 1, 1,                1, 1, 1,
    1,    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,    1,
    1,          1, 1, 1, 1,
    1, 1, 1, 1,          1,
             1,          1, 
    1,    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,    1,
    1, 1, 1,                1, 1, 1,
    // 3. Schicht
    2, 2, 2,                2, 2, 2,
    2,    2, 2, 2, 2, 2,    2,    2, 2,    2,
                   2, 2, 2,
    2, 2, 2, 2,          2,                    
    2,    2, 2,    2,    2, 2, 2, 2, 2,    2,
    2, 2, 2,                2, 2, 2,
    // 4. Schicht
    3,                            3,

          3,                3,

    3,                            
                            3,
          3,                3
];

matchingGame.flower.selectable = [
    false, false, false,                                    false, false, false,
    false,        false, false, false, false, false, false, false, false, false, false,        false,
    false,                      false, false, false, false,
    false, false, false, false,                      false,
                         false,                      false, 
    false,        false, false, false, false, false, false, false, false, false, false,        false,
    false, false, false,                                    false, false, false,
    // 2. Schicht
    false, false, false,                                    false, false, false,
    false,        false, false, false, false, false, false, false, false, false, false,        false,
    true,                       true,  false, false, false,
    false, false, false, false,                      false,
                         true,                       true,  
    false,        false, false, false, false, false, false, false, false, false, false,        false,
    false, false, false,                                    false, false, false,
    // 3. Schicht
    false, false, true,                                     true, false, false,
    true,         true,  true,  false, false, true,         true,         true, true,         true,
                                       false, false, true,
    false, false, false, true,                       true,
                                       
    true,         true,  true,         true,         true, false, false, false, true,         true,
    true,  false, false,                                    false, false, true,
    // 4. Schicht
true, true,

                  true,                                     true,

                                    true, 
                                                            true,
                  true,                                     true
];

//---------------------------- Spider

matchingGame.spider= {};

matchingGame.spider.positionX = [
              3.5, 4.5,           7,        9,         11.5, 12.5,
    1.5,           4.5, 5.5,      7.5, 8.5,                
         2.5, 3.5, 4.5,      6.5, 7.5, 8.5, 9.5,  10.5, 11.5,     
                        5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5, 12.5, 13.5, 14.5,
    1,   2,   3,   4,   5,   6,   7,   8,   9,   10,   11,   12, 13,   14,   15,
                        5.5, 6.5, 7.5, 8.5, 9.5, 10.5,
    1.5, 2.5, 3.5, 4.5,      6.5, 7.5, 8.5, 9.5,       11.5, 12.5,
                                  7.5, 8.5, 13.5, 14.5,
    // 2. Schicht
              3.5, 4.5,           7,        9,         11.5, 12.5,
    1.5,           4.5, 5.5,                            
         2.5, 3.5, 4.5,           7.5, 8.5,      10.5, 11.5,   
                             6.5, 7.5, 8.5, 9.5,       11.5, 12.5, 13.5, 14.5,
    1,   2,   3,   4,        6,   7,   8,   9,   10,         12, 13,   14,   15,
                             6.5, 7.5, 8.5, 9.5,
    1.5, 2.5, 3.5, 4.5,           7.5, 8.5,            11.5, 12.5,
                                  7.5, 8.5, 13.5, 14.5,
    // 3. Schicht
                   4.5,                                11.5,
    1.5,                5.5,                                           
              3.5,                                           
                                 7.5, 8.5,          10.5,    12.5,     14.5,
    1,        3,                 7,   8,   9, 13,         15,
                                 7.5, 8.5,
    1.5,      3.5,               7.5, 8.5,                   12.5,
                                                                        14.5,
    // 4. Schicht
                                      8
];

matchingGame.spider.positionY = [
                  0, 0,           0,        0,         0, 0,
    1.5,           1, 1.5,      1, 1,                 
         2, 2.5, 2.5,      2, 2, 2, 2,  1.5, 1,      
                        3, 3, 3, 3, 3, 3,             2.5, 2.5, 2, 1.5,
    4.5, 4.5, 4.5, 4.5, 4,   4,   4,   4,   4,   4,   4,   4.5, 4.5,   4.5,   4.5,
                        5, 5, 5, 5, 5, 5,
    7, 7, 6.5, 6,          6, 6, 6, 6,       6, 6.5,
                              7, 7,                        7, 7,
    // 2. Schicht
                  0, 0,           0,        0,         0, 0,
    1.5,           1, 1.5,                      
         2, 2.5, 2.5,           2, 2,  1.5, 1,          
                             3, 3, 3, 3,                 2.5, 2.5, 2, 1.5,
    4.5,   4.5,   4.5,   4.5,        4,   4,   4,   4,   4, 4.5,   4.5,   4.5,   4.5,
                             5, 5, 5, 5,
    7, 7,  6.5, 6,           6, 6,            6, 6.5,
                         7, 7,                        7, 7,
    // 3. Schicht
                   0,                                0,
    1.5,                1.5,                                                   
              2.5,                                                      
                                 3, 3,      1.5,            2.5,             1.5,
    4.5,        4.5,                 4,   4, 4,                      4.5,         4.5,
                                 5, 5,
    7,        6.5,               6, 6,                   6.5,
                                                                                   7,
    // 4. Schicht
                                      4.5
];

matchingGame.spider.shift = [
              0, 0,           0,        0,         0, 0,
    0,           0, 0,      0, 0,                 
         0, 0, 0,      0, 0, 0, 0,   0, 0,    
                        0, 0, 0, 0, 0, 0,     0, 0,   0, 0,  
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 0,   0,
                        0, 0, 0, 0, 0, 0,
    0,   0,   0, 0,        0, 0, 0, 0,       0, 0,
                         0, 0,                        0, 0,
    // 2. Schicht
              1, 1,           1,        1,         1, 1,
    1,           1, 1,                                  
         1, 1, 1,           1, 1,   1, 1,          
                             1, 1, 1, 1,         1, 1,  1, 1,
    1,   1,   1,   1,        1,   1,   1,   1,   1,         1, 1,   1,   1,
                             1, 1, 1, 1,
    1, 1, 1, 1,                 1, 1,            1, 1,
                         1, 1,                        1, 1,
    // 3. Schicht
                   2,                                2,
    2,                2,                                        
              2,                             2,              
                                 2, 2,                       2, 2,
    2,        2,                 2,   2,   2, 2,         2,
                                 2, 2,
    2,        2,               2, 2,                   2,
                                                                           2,
    // 4. Schicht
                                      3
];

matchingGame.spider.selectable = [
              false, false,           false,        false, false, false,
    false,           false, false,      true, true,               
         false, false, false,      false, false, false, false,  
                        false, false, false, false, false, false,        false, false,  false, false,
    false,   false,   false,   false,   false,   false,  false, false,  false, false,   false,   false,   false,   false,   false,   false, false,
                        true, false, false, false, false, true,
    false, false,     false, false,              true, false, false, true, false, false,
                         false, false,                        false, false,
    // 2. Schicht
              true, false,           true,        true, false, true,
    false,           true, false,                                  
         false, false, true,           true, true,      false, true,       
                             true, false, false, true,                    true, false,  false, false,
    false,   false,   false,   true,        true,   false, false,   false,   true,         true,   false,   false,   false,
                             true, false, false, true,
    false, false,     false, true,           false, false,            true, false,
                         true, true,                        false, false,
    // 3. Schicht
                   true,                                true,
    true,                true,                                                                 
              true,                                           
                                 true, true,        true,     true,                            true,
    true,        true,                 true,   false, true,                      true,         true,
                                 false, false,
    true,        true,               true, true, true,
                                                                                                true,
    // 4. Schicht
                                      true
];
