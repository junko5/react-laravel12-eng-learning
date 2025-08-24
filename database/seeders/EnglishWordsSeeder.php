<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\EnglishWords;

class EnglishWordsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $words = [
            ['word' => 'apple', 'meaning' => 'りんご'],
            ['word' => 'book', 'meaning' => '本'],
            ['word' => 'dog', 'meaning' => '犬'],
            ['word' => 'cat', 'meaning' => '猫'],
            ['word' => 'house', 'meaning' => '家'],
            ['word' => 'car', 'meaning' => '車'],
            ['word' => 'water', 'meaning' => '水'],
            ['word' => 'sun', 'meaning' => '太陽'],
            ['word' => 'school', 'meaning' => '学校'],
            ['word' => 'music', 'meaning' => '音楽'],
        ];

        foreach ($words as $wordData) {
            EnglishWords::create($wordData);
        }
    }
}
